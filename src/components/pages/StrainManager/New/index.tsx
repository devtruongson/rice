import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateStrain } from '../../../../services/strain/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useUpdateStrain } from '../../../../services/strain/update';
import { routesMap } from '../../../../routes/routes';
import { useGetStrain } from '../../../../services/strain/get-one';
import { StrainResType } from '../../../../type/strain';

const New = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);

    const { data } = useGetStrain({
        id: searchParams.get('id') || '',
    });

    const create = useCreateStrain({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Post thành công',
                });
                setValue('');
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

    const update = useUpdateStrain({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
                navigate(routesMap.Strain.replace('/*', '/manager'));
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
        if (!value) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

        create.mutate({ name: value });
    };

    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            name: value,
        });
    }, [data, value]);

    useEffect(() => {
        if (data?.data) {
            const strain = data.data as StrainResType;
            setValue(strain.name);
        }
    }, [data]);

    return (
        <Box>
            <Text textAlign="center" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                {isEditPage ? 'Edit' : 'Create'}
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={10} mb={10}>
                <GridItem colSpan={2}>
                    <BasicInput
                        label="name"
                        placeholder="name"
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                    />
                </GridItem>

                <GridItem colSpan={1} pt={9}>
                    <Button onClick={isEditPage ? handleEdit : handleCreate}>{isEditPage ? 'Edit' : 'Create'}</Button>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default New;
