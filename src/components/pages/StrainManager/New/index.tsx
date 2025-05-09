import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    FormErrorMessage,
    Grid,
    GridItem,
    Heading,
    Icon,
    InputGroup,
    useColorModeValue,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaEdit, FaPlus, FaSave } from 'react-icons/fa';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getAxiosError } from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useCreateStrain } from '../../../../services/strain/create';
import { useGetStrain } from '../../../../services/strain/get-one';
import { useUpdateStrain } from '../../../../services/strain/update';
import { StrainResType } from '../../../../type/strain';
import BasicInput from '../../../atoms/Input/BasicInput';

const New = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);

    // Theme colors
    const cardBg = useColorModeValue('white', 'gray.800');
    const headerBg = useColorModeValue('purple.50', 'purple.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const buttonColorScheme = isEditPage ? 'green' : 'purple';

    // Lấy thông tin strain 
    const { data, isLoading: isLoadingStrain } = useGetStrain({
        id: searchParams.get('id') || '',
    });

    // Tạo strain 
    const create = useCreateStrain({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Strain thành công',
                    duration: 3000,
                });
                setValue('');
                setError('');
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

    // Cập nhật strain 
    const update = useUpdateStrain({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Cập nhật Strain thành công',
                    duration: 3000,
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

    // Validate dữ liệu 
    const handleValidate = useCallback(() => {
        if (!value.trim()) {
            setError('Tên strain không được để trống');
            return false;
        }
        setError('');
        return true;
    }, [value]);

    // Tạo strain 
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

        create.mutate({ name: value.trim() });
    };

    // Cập nhật strain 
    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            name: value.trim(),
        });
    }, [data, value]);

    // Set value khi có dữ liệu 
    useEffect(() => {
        if (data?.data) {
            const strain = data.data as StrainResType;
            setValue(strain.name);
        }
    }, [data]);

    // Loading 
    const isLoading = isEditPage ? update.isPending : create.isPending;

    return (
        <Card
            bg={cardBg}
            boxShadow="md"
            borderRadius="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor={borderColor}
        >
            <CardHeader bg={headerBg} py={4}>
                <Flex align="center" justify="center">
                    <Icon
                        as={isEditPage ? FaEdit : FaPlus}
                        mr={2}
                        boxSize={5}
                        color={isEditPage ? 'green.500' : 'purple.500'}
                    />
                    <Heading size="md">{isEditPage ? 'Chỉnh sửa Strain' : 'Tạo mới Strain'}</Heading>
                </Flex>
            </CardHeader>

            <CardBody p={6}>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} alignItems="flex-end">
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl isInvalid={!!error} isRequired>
                            {/* <FormLabel fontWeight="medium">Tên Strain</FormLabel> */}
                            <InputGroup>
                                <BasicInput
                                    label="Tên Strain"
                                    placeholder="Nhập tên strain"
                                    value={value}
                                    onChange={(event) => {
                                        setValue(event.target.value);
                                        if (error) setError('');
                                    }}
                                    isDisabled={isLoadingStrain}
                                />
                            </InputGroup>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        {/* Button tạo hoặc cập nhật strain */}
                        <Button
                            onClick={isEditPage ? handleEdit : handleCreate}
                            colorScheme={buttonColorScheme}
                            size="md"
                            leftIcon={<Icon as={isEditPage ? FaSave : FaPlus} />}
                            isLoading={isLoading}
                            loadingText={isEditPage ? 'Đang cập nhật' : 'Đang tạo'}
                            w="full"
                        >
                            {isEditPage ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </GridItem>
                </Grid>
            </CardBody>
        </Card>
    );
};

export default New;
