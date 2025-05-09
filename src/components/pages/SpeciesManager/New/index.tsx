import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetSpeci } from '../../../../services/species/get-one';
import { useCreateSpecies } from '../../../../services/species/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useUpdateSpecies } from '../../../../services/species/update';
import { routesMap } from '../../../../routes/routes';
import { SpeciesResType } from '../../../../type/species';
import { Box, Button, Divider, Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import colors from '../../../../constants/colors';

const defaultValue = {
    name: '',
};

const New = () => {
    const [value, setValue] = useState(defaultValue);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);

    // Lấy thông tin species 
    const { data } = useGetSpeci({
        id: searchParams.get('id') || '',
    });

    // Tạo species 
    const create = useCreateSpecies({
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

    // Cập nhật species 
    const update = useUpdateSpecies({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
                navigate(routesMap.Species.replace('/*', '/manager'));
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

    // Validate dữ liệu 
    const handleValidate = useCallback(() => {
        if (!value.name) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    // Tạo species 
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

        create.mutate(value);
    };

    // Cập nhật species 
    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            ...value,
        });
    }, [data, value]);

    // Set value khi có dữ liệu 
    useEffect(() => {
        if (data?.data) {
            const species = data.data as SpeciesResType;
            setValue({
                name: species?.name || '',
            });
        }
    }, [data]);

    return (
        <HStack justifyContent="center">
            <Box w="80%" rounded={4} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                <Text textAlign="start" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                    {isEditPage ? 'Cập nhật Species' : 'Tạo Species'}
                </Text>
                <Divider borderWidth={1} />
                <Grid templateColumns="repeat(3, 1fr)" gap={10} mb={10} pt={4} px={6}>
                    {/* Input tên species */}
                    <GridItem colSpan={2}>
                        <BasicInput
                            label="Tên Species"
                            placeholder="Nhập tên species"
                            value={value.name}
                            onChange={(event) => {
                                setValue({ ...value, name: event.target.value });
                            }}
                        />
                    </GridItem>
                    <GridItem pt={9}>
                        {/* Button tạo hoặc cập nhật species */}
                        <Button onClick={isEditPage ? handleEdit : handleCreate} bg={colors.brand} color="white">
                            {isEditPage ? 'Lưu thay đổi' : 'Tạo'}
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
        </HStack>
    );
};

export default New;
