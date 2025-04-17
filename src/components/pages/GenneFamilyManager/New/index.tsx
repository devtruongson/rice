import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GeneFamilyCreateType, GeneFamilyResType } from '../../../../type/geneFamily';
import { useGetGeneFamily } from '../../../../services/geneFamily/get-one';
import { useCreateGeneFamily } from '../../../../services/geneFamily/create';
import toast from '../../../../libs/toast';
import { getAxiosError } from '../../../../libs/axios';
import { isAxiosError } from 'axios';
import { useUpdateGeneFamily } from '../../../../services/geneFamily/update';
import { routesMap } from '../../../../routes/routes';

const defaultValue = {
    name: '',
    path_detail: [''],
};
const New = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<GeneFamilyCreateType>(defaultValue);

    const { data } = useGetGeneFamily({
        id: searchParams.get('id') || '',
    });

    const create = useCreateGeneFamily({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
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

    const update = useUpdateGeneFamily({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
                navigate(routesMap.GeneFamily.replace('/*', '/manager'));
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
    const handleValidate = () => {
        if (!value.name || !value.path_detail[0] || !value.path_detail[1]) {
            toast({
                status: 'warning',
                title: 'Vui lòng nhập đủ thông tin',
            });
            return false;
        }
        return true;
    };
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

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
            const geneFamily = data.data as GeneFamilyResType;
            setValue({
                name: geneFamily?.name || '',
                path_detail: geneFamily?.path_detail,
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
                            console.log(event.target.value);
                            setValue({ ...value, name: event.target.value });
                        }}
                    />
                </GridItem>
                <GridItem>
                    <BasicInput
                        label="view tree"
                        placeholder="view tree"
                        value={value.path_detail[0]}
                        onChange={(event) => {
                            setValue({ ...value, path_detail: [event.target.value, value.path_detail[1]] });
                        }}
                    />
                </GridItem>

                <GridItem>
                    <BasicInput
                        label="view report"
                        placeholder="view report"
                        value={value.path_detail[1]}
                        onChange={(event) => {
                            setValue({ ...value, path_detail: [value.path_detail[0], event.target.value] });
                        }}
                    />
                </GridItem>
            </Grid>
            <Flex justifyContent="start">
                <Button onClick={isEditPage ? handleEdit : handleCreate}>{isEditPage ? 'Edit' : 'Create'}</Button>
            </Flex>
        </Box>
    );
};

export default New;
