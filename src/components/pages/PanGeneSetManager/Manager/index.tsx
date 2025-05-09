import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useGetPanGeneSets } from '../../../../services/panGeneSet/get-more';
import { PanGeneSetResType } from '../../../../type/panGeneSet';
import ActionCustom from '../../../molecules/ActionCustom';
import Pagination from '../../../molecules/Pagination';
import TableCusTom from '../../../molecules/Table';

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);

    // Lấy danh sách PanGeneSet 
    const { data, refetch } = useGetPanGeneSets({
        rest: { type: '', page: page, pageSize: pageSize },
    });

    // Đóng mở modal confirm xóa PanGeneSet 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDel, setIdDel] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cancelRef = useRef<any>(null);

    // Build data table 
    const panGeneSets = useMemo(
        () =>
            data?.data?.data?.map((item: PanGeneSetResType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {
                                onOpen();
                                setIdDel(item._id);
                            }}
                            actionEdit={() => navigate(routesMap.PanGeneSet.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    const bgCard = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box>
            {/* Modal confirm xóa PanGeneSet */}
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent borderRadius="md" boxShadow="xl">
                        <AlertDialogHeader
                            fontSize="lg"
                            fontWeight="bold"
                            borderBottomWidth="1px"
                            borderColor={borderColor}
                            pb={3}
                        >
                            Xóa Pan Gene Set
                        </AlertDialogHeader>

                        <AlertDialogBody py={4}>
                            <Text>Bạn chắc chắn muốn xóa bài viết, hành động này không thể khôi phục.</Text>
                        </AlertDialogBody>

                        <AlertDialogFooter borderTopWidth="1px" borderColor={borderColor} pt={3}>
                            <Button ref={cancelRef} onClick={onClose} size="md" fontWeight="medium">
                                Hủy bỏ
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    if (!idDel) return;
                                    try {
                                        const res = await axios.delete(`/pan-gene-set/${idDel}`);

                                        if (res.data.statusCode === HttpStatusCode.Ok) {
                                            toast({
                                                status: 'info',
                                                title: 'Bạn đã xóa thành công bài viết',
                                            });
                                            refetch();
                                            setIdDel(null);
                                            onClose();
                                        }
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                                ml={3}
                                size="md"
                            >
                                Xóa
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Box bg={bgCard} borderRadius="lg" boxShadow="md" p={5} borderWidth="1px" borderColor={borderColor}>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading size="md">Quản lý PanGene Set</Heading>
                    <Button
                        colorScheme="blue"
                        onClick={() => navigate(routesMap.PanGeneSet.replace('/*', '/new'))}
                        size="sm"
                    >
                        Thêm mới
                    </Button>
                </Flex>

                {/* Table PanGeneSet */}
                <TableCusTom
                    columns={[
                        { key: 'name', label: 'Tên', w: '10%' },
                        { key: 'path_detail', label: 'link chi tiết', w: '20%' },
                        { key: 'action', label: '', w: '15%' },
                    ]}
                    data={panGeneSets}
                />

                {/* Pagination */}
                <Box mt={4}>
                    <Pagination currentPage={data?.data?.page || 1} totalPage={data?.data?.totalPages || 1} />
                </Box>
            </Box>
        </Box>
    );
};

export default Manager;
