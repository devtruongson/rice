import { Box, Button, Flex, FormControl, Grid, GridItem, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getAxiosError } from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useCreatePanGeneSet } from '../../../../services/panGeneSet/create';
import { useGetPanGeneSet } from '../../../../services/panGeneSet/get-one';
import { useUpdatePanGeneSet } from '../../../../services/panGeneSet/update';
import { PanGeneSetCreateType, PanGeneSetResType } from '../../../../type/panGeneSet';
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

    // Lấy thông tin PanGeneSet 
    const { data } = useGetPanGeneSet({
        id: searchParams.get('id') || '',
    });

    // Tạo PanGeneSet 
    const create = useCreatePanGeneSet({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Pan Gene Set thành công',
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

    // Cập nhật PanGeneSet 
    const update = useUpdatePanGeneSet({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Edit Pan Gene Set thành công',
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

    // Validate dữ liệu 
    const handleValidate = useCallback(() => {
        if (!value.name || !value.path_detail) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    // Tạo PanGeneSet 
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) return;
        create.mutate(value);
    };

    // Cập nhật PanGeneSet 
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
            const res = data.data as PanGeneSetResType;
            setValue({
                name: res?.name || '',
                path_detail: res.path_detail || '',
            });
        }
    }, [data]);

    const bgCard = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const buttonColorScheme = isEditPage ? 'orange' : 'green';

    return (
        <Box
            bg={bgCard}
            borderRadius="lg"
            boxShadow="md"
            p={6}
            borderWidth="1px"
            borderColor={borderColor}
            maxWidth="800px"
            mx="auto"
        >
            <VStack spacing={6} align="stretch">
                <Heading
                    as="h2"
                    size="md"
                    textAlign="center"
                    textTransform="uppercase"
                    pb={2}
                    borderBottomWidth="1px"
                    borderColor={borderColor}
                >
                    {isEditPage ? 'Cập nhật PanGene Set' : 'Tạo PanGene Set'}
                </Heading>

                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                    <GridItem>
                        <FormControl isRequired>
                            {/* <FormLabel fontWeight="medium">Name</FormLabel> */}         
                            <BasicInput
                                label="Tên "
                                placeholder="Nhập tên PanGene set"
                                value={value.name}
                                onChange={(event) => {
                                    setValue({ ...value, name: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isRequired>
                            {/* <FormLabel fontWeight="medium">Path Detail</FormLabel> */}  
                            <BasicInput
                                label="Link chi tiết"
                                placeholder="Enter path detail"
                                value={value.path_detail}
                                onChange={(event) => {
                                    setValue({ ...value, path_detail: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>
                </Grid>

                <Flex justify="space-between" pt={4} borderTopWidth="1px" borderColor={borderColor}>
                    {/* Button hủy bỏ */}
                    <Button variant="outline" onClick={() => navigate(routesMap.PanGeneSet.replace('/*', '/manager'))}>
                        Hủy bỏ
                    </Button>

                    {/* Button tạo hoặc cập nhật PanGeneSet */}
                    <Button
                        variant="outline"
                        colorScheme={buttonColorScheme}
                        onClick={isEditPage ? handleEdit : handleCreate}
                        isLoading={isEditPage ? update.isPending : create.isPending}
                    >
                        {isEditPage ? 'Lưu thay đổi' : 'Tạo'}
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};

export default New;
