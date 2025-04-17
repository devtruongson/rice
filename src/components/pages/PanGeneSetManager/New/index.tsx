import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PanGeneSetCreateType, PanGeneSetResType } from '../../../../type/panGeneSet';
import { useGetPanGeneSet } from '../../../../services/panGeneSet/get-one';
import { useCreatePanGeneSet } from '../../../../services/panGeneSet/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { routesMap } from '../../../../routes/routes';
import { useUpdatePanGeneSet } from '../../../../services/panGeneSet/update';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';

const defaultValue = {
    name: '',
    path_detail: '',
};
const New = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<PanGeneSetCreateType>(defaultValue);

    const { data } = useGetPanGeneSet({
        id: searchParams.get('id') || '',
    });

    const create = useCreatePanGeneSet({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Post thành công',
                });
                setValue(defaultValue);
            },
            onError(error) {
                if (isAxiosError(error)) {
                    toast({
                        status: 'error',
                        title: getAxiosError(error),
                    });
                }
            },
        },
    });

    const update = useUpdatePanGeneSet({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Edit Post thành công',
                });
                navigate(routesMap.PanGeneSet.replace('/*', '/manager'));
            },
            onError(error) {
                if (isAxiosError(error)) {
                    toast({
                        status: 'error',
                        title: getAxiosError(error),
                    });
                }
            },
        },
    });

    const handleValidate = useCallback(() => {
        if (!value.name || !value.path_detail) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) return;
        create.mutate(value);
    };

    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            ...value,
        });
    }, [data, value]);

    useEffect(() => {
        if (data?.data) {
            const res = data.data as PanGeneSetResType;
            setValue({
                name: res?.name || '',
                path_detail: res.path_detail || '',
            });
        }
    }, [data]);

    return (
        <Box>
            <Text textAlign="center" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                {isEditPage ? 'Edit' : 'Create'}
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} mb={10}>
                <GridItem>
                    <BasicInput
                        label="name"
                        placeholder="name"
                        value={value.name}
                        onChange={(event) => {
                            setValue({ ...value, name: event.target.value });
                        }}
                    />
                </GridItem>
                <GridItem>
                    <BasicInput
                        label="path detail"
                        placeholder="path detail"
                        value={value.path_detail}
                        onChange={(event) => {
                            setValue({ ...value, path_detail: event.target.value });
                        }}
                    />
                </GridItem>
            </Grid>
            <Flex justifyContent="end">
                <Button onClick={isEditPage ? handleEdit : handleCreate}>{isEditPage ? 'Edit' : 'Create'}</Button>
            </Flex>
        </Box>
    );
};

export default New;
