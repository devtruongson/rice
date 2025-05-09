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
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useGetPostByType } from '../../../../services/post/get-by-type';
import { PostType } from '../../../../type/post';
import ActionCustom from '../../../molecules/ActionCustom';
import Pagination from '../../../molecules/Pagination';
import TableCusTom from '../../../molecules/Table';

const PostManager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);

    // Lấy danh sách bài viết 
    const { data, refetch } = useGetPostByType({
        rest: { type: '', page: page, pageSize: pageSize },
    });

    // Đóng mở modal confirm xóa bài viết 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDel, setIdDel] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cancelRef = useRef<any>(null);

    // Build data table 
    const posts = useMemo(
        () =>
            data?.data?.data?.map((item: PostType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {
                                onOpen();
                                setIdDel(item._id);
                            }}
                            actionEdit={() => navigate(routesMap.PostAdmin.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data?.data?.data, navigate],
    );

    return (
        <Box bg="white" borderWidth="1px" borderRadius="lg" boxShadow="md" p={6}>
            {/* Modal confirm xóa bài viết */}
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Xóa blog
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Bạn chắc chắn muốn xóa bài viết, hành động này không thể khôi phục.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Hủy bỏ
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    if (!idDel) return;
                                    try {
                                        const res = await axios.delete(`/post/${idDel}`);

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
                            >
                                Xóa
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={6}>
                Quản lý bài đăng{' '}
            </Text>

            {/* Table bài viết */}
            <TableCusTom
                columns={[
                    { key: 'title', label: 'tiêu đề', w: '10%' },
                    { key: 'sub_title', label: 'Phụ đề', w: '20%' },
                    { key: 'author', label: 'Tác giả', w: '10%' },
                    { key: 'description', label: 'Mô tả', w: '40%' },
                    { key: 'type', label: 'Kiểu', w: '5%' },
                    { key: 'action', label: '', w: '15%' },
                ]}
                data={posts}
                variant="simple"
                size="md"
            />
            <Flex justifyContent="center" mt={6}>
                {/* Pagination */}
                <Pagination currentPage={data?.data?.page || 1} totalPage={data?.data?.totalPages || 1} />
            </Flex>
        </Box>
    );
};

export default PostManager;
