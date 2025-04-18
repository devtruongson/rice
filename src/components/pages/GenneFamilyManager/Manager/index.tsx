import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useGetGeneFamilys } from '../../../../services/geneFamily/get-more';
import { GeneFamilyResType } from '../../../../type/geneFamily';
import ActionCustom from '../../../molecules/ActionCustom';
import Pagination from '../../../molecules/Pagination';
import TableCusTom from '../../../molecules/Table';

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);
    const { data, refetch } = useGetGeneFamilys({
        rest: { page: page, pageSize: pageSize },
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDel, setIdDel] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cancelRef = useRef<any>(null);

    const geneFamilys = useMemo(
        () =>
            data?.data?.data?.map((item: GeneFamilyResType) => {
                return {
                    ...item,
                    path_detail: (
                        <VStack alignItems="start">
                            <Text>view tree :{item.path_detail[0]}</Text>
                            <Text>view report :{item.path_detail[1]}</Text>
                        </VStack>
                    ),
                    action: (
                        <ActionCustom
                            actionDelete={() => {
                                onOpen();
                                setIdDel(item._id);
                            }}
                            actionEdit={() => navigate(routesMap.GeneFamily.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    console.log(geneFamilys);
    return (
        <Box>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Xóa blog
                        </AlertDialogHeader>

                        <AlertDialogBody>Bạn chắc chắn muốn xóa, hành động này không thể khôi phục.</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Hủy bỏ
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    if (!idDel) return;
                                    try {
                                        const res = await axios.delete(`/gene-family/${idDel}`);

                                        if (res.data.statusCode === HttpStatusCode.Ok) {
                                            toast({
                                                status: 'info',
                                                title: 'Bạn đã xóa thành công!',
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
            <Text>GeneFamily Manager</Text>
            <TableCusTom
                columns={[
                    { key: 'name', label: 'name', w: '10%' },
                    { key: 'path_detail', label: 'path detail', w: '20%' },
                    { key: 'action', label: '', w: '15%' },
                ]}
                data={geneFamilys}
            />
            <Pagination currentPage={data?.data?.page || 1} totalPage={data?.data?.totalPages || 1} />
        </Box>
    );
};

export default Manager;
