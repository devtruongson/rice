import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useMemo, useRef, useState } from 'react';
import { FaDna, FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useGetStrains } from '../../../../services/strain/get-all';
import { StrainResType } from '../../../../type/strain';
import ActionCustom from '../../../molecules/ActionCustom';
import TableCusTom from '../../../molecules/Table';

const Manager = () => {
    const navigate = useNavigate();

    // Đóng mở modal confirm xóa strain  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDel, setIdDel] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Theme colors
    const cardBg = useColorModeValue('white', 'gray.800');
    const headerBg = useColorModeValue('purple.50', 'purple.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cancelRef = useRef<any>(null);

    // Lấy danh sách strain 
    const { data, refetch } = useGetStrains({});

    // Build data table 
    const strains = useMemo(
        () =>
            data?.data?.map((item: StrainResType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {
                                onOpen();
                                setIdDel(item._id);
                            }}
                            actionEdit={() => navigate(routesMap.Strain.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    // Filter strains based on search query
    const filteredStrains = useMemo(() => {
        if (!searchQuery) return strains;
        return strains.filter((strain: { name: string }) =>
            strain.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [strains, searchQuery]);

    return (
        <Box>
            {/* Modal confirm xóa strain */}
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Xóa strain
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Bạn chắc chắn muốn xóa strain này? Hành động này không thể khôi phục.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} variant="outline">
                                Hủy bỏ
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    if (!idDel) return;
                                    try {
                                        // Xóa strain 
                                        const res = await axios.delete(`/strain/${idDel}`);

                                        if (res.data.statusCode === HttpStatusCode.Ok) {
                                            toast({
                                                status: 'success',
                                                title: 'Xóa strain thành công!',
                                            });
                                            refetch();
                                            setIdDel(null);
                                            onClose();
                                        }
                                    } catch (error) {
                                        console.log(error);
                                        toast({
                                            status: 'error',
                                            title: 'Có lỗi xảy ra khi xóa strain',
                                        });
                                    }
                                }}
                                ml={3}
                            >
                                Xóa
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Card
                bg={cardBg}
                boxShadow="sm"
                borderRadius="md"
                overflow="hidden"
                borderWidth="1px"
                borderColor={borderColor}
                mb={4}
            >
                <CardHeader bg={headerBg} py={4}>
                    <Flex justify="space-between" align="center">
                        <HStack>
                            <Icon as={FaDna} boxSize={5} color="purple.500" />
                            <Heading size="md">Danh sách Strain</Heading>
                        </HStack>
                        <Badge colorScheme="purple" fontSize="md" borderRadius="full" px={3} py={1}>
                            {filteredStrains.length} Strains
                        </Badge>
                    </Flex>
                </CardHeader>

                <CardBody pt={5}>
                    <Flex mb={4} justifyContent="space-between">
                        <InputGroup maxW="xs">
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaSearch} color="gray.400" />
                            </InputLeftElement>
                            <Input
                                placeholder="Tìm kiếm theo tên..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                borderRadius="md"
                            />
                        </InputGroup>

                        <HStack>
                            <Button leftIcon={<FaFilter />} variant="outline" size="md">
                                Lọc
                            </Button>
                            <Button leftIcon={<FaSortAmountDown />} variant="outline" size="md">
                                Sắp xếp
                            </Button>
                        </HStack>
                    </Flex>

                    {/* Table strain */}
                    <TableCusTom
                        columns={[
                            { key: 'name', label: 'Tên Strain', w: '85%' },
                            { key: 'action', label: 'Thao tác', w: '15%' },
                        ]}
                        data={filteredStrains}
                        _empty="Không tìm thấy strain nào"
                    />
                </CardBody>
            </Card>
        </Box>
    );
};

export default Manager;
