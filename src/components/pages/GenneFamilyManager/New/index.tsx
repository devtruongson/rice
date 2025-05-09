import {
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaEdit, FaPlus, FaSave } from 'react-icons/fa';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getAxiosError } from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useCreateGeneFamily } from '../../../../services/geneFamily/create';
import { useGetGeneFamily } from '../../../../services/geneFamily/get-one';
import { useUpdateGeneFamily } from '../../../../services/geneFamily/update';
import { GeneFamilyCreateType, GeneFamilyResType } from '../../../../type/geneFamily';
import BasicInput from '../../../atoms/Input/BasicInput';

const defaultValue = {
    name: '',
    path_detail: ['', ''],
};

const New = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<GeneFamilyCreateType>(defaultValue);

    // Theme colors
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const headerBg = useColorModeValue('blue.50', 'blue.900');
    const buttonColorScheme = isEditPage ? 'green' : 'blue';

    // Lấy thông tin họ gene 
    const { data } = useGetGeneFamily({
        id: searchParams.get('id') || '',
    });

    // Tạo họ gene 
    const create = useCreateGeneFamily({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
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

    // Cập nhật họ gene 
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

    // Validate dữ liệu 
    const handleValidate = useCallback(() => {
        if (!value.name || !value.path_detail[0] || !value.path_detail[1]) {
            toast({
                status: 'warning',
                title: 'Vui lòng nhập đủ thông tin',
            });
            return false;
        }
        return true;
    }, [value]);

    // Tạo họ gene 
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

        create.mutate(value);
    };

    // Cập nhật họ gene 
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
            const geneFamily = data.data as GeneFamilyResType;
            setValue({
                name: geneFamily?.name || '',
                path_detail: geneFamily?.path_detail,
            });
        }
    }, [data]);

    // Loading 
    const isLoading = isEditPage ? update.isLoading : create.isLoading;

    return (
        <Container maxW="container.md" py={4}>
            <Card
                bg={cardBg}
                boxShadow="md"
                borderRadius="lg"
                overflow="hidden"
                borderWidth="1px"
                borderColor={borderColor}
            >
                <Box bg={headerBg} p={4} borderBottom="1px" borderColor={borderColor}>
                    <Flex align="center" justify="center">
                        <Icon
                            as={isEditPage ? FaEdit : FaPlus}
                            mr={2}
                            boxSize={5}
                            color={isEditPage ? 'green.500' : 'blue.500'}
                        />
                        <Heading size="md">{isEditPage ? 'Chỉnh sửa họ gen' : 'Tạo họ gen mới'}</Heading>
                    </Flex>
                </Box>

                <CardBody py={6}>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel fontWeight="medium">Tên họ gen</FormLabel>
                            {/* Input tên họ gen */}
                            <BasicInput
                                label=""
                                placeholder="Nhập tên họ gen"
                                value={value.name}
                                onChange={(event) => {
                                    setValue({ ...value, name: event.target.value });
                                }}
                            />
                        </FormControl>

                        <Divider />

                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel fontWeight="medium">Xem đường dẫn cây</FormLabel>
                                    {/* Input đường dẫn cây xem */}
                                    <BasicInput
                                        label=""
                                        placeholder="Đường dẫn cây xem"
                                        value={value.path_detail[0]}
                                        onChange={(event) => {
                                            setValue({
                                                ...value,
                                                path_detail: [event.target.value, value.path_detail[1] || ''],
                                            });
                                        }}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl>
                                    <FormLabel fontWeight="medium">Đường dẫn báo cáo</FormLabel>
                                    {/* Input đường dẫn báo cáo */}
                                    <BasicInput
                                        label=""
                                        placeholder="Nhập đường dẫn xem báo cáo"
                                        value={value.path_detail[1]}
                                        onChange={(event) => {
                                            setValue({
                                                ...value,
                                                path_detail: [value.path_detail[0] || '', event.target.value],
                                            });
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </Stack>

                    <Flex justifyContent="flex-end" mt={8}>
                        {/* Button tạo hoặc cập nhật họ gen */}
                        <Button
                            onClick={isEditPage ? handleEdit : handleCreate}
                            colorScheme={buttonColorScheme}
                            size="md"
                            leftIcon={<Icon as={isEditPage ? FaSave : FaPlus} />}
                            isLoading={isLoading}
                            loadingText={isEditPage ? 'Cập nhật' : 'Tạo'}
                            px={6}
                        >
                            {isEditPage ? 'Cập nhật' : 'Tạo'}
                        </Button>
                    </Flex>
                </CardBody>
            </Card>
        </Container>
    );
};

export default New;
