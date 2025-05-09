import {
    Box,
    Button,
    Divider,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import ConfirmDelete from '../../../molecules/ConfirmDelete';
import TableCusTom from '../../../molecules/Table';
import ActionCustom from '../../../molecules/ActionCustom';
import { routesMap } from '../../../../routes/routes';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteStudy } from '../../../../services/study/delete';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useGetStudies } from '../../../../services/study/get-more';
import { StudyResType } from '../../../../type/study';
import Pagination from '../../../molecules/Pagination';

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);

    // Đóng mở modal confirm xóa study 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDelete, setIdDelete] = useState<string>('');

    // Đóng mở modal chi tiết study 
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const [indexShow, setIndexShow] = useState(0);

    // Xóa study 
    const deleteSpecies = useDeleteStudy({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
                onClose();
                refetch();
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

    // Lấy danh sách study 
    const { data, refetch } = useGetStudies({ rest: { page: page, pageSize: pageSize } });
    // build data table 
    const studies = useMemo(
        () =>
            data?.data?.data?.map((item: StudyResType, index: number) => {
                return {
                    ...item,
                    species: item?.species?.name || '',
                    action: (
                        <ActionCustom
                            actionShow={() => {
                                setIndexShow(index);
                                onOpenModal();
                            }}
                            actionDelete={() => {
                                setIdDelete(item._id);
                                onOpen();
                            }}
                            actionEdit={() => navigate(routesMap.Study.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    return (
        <HStack justifyContent="center">
            <Box w="100%" rounded={4} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                <Text textAlign="start" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                    Quản lý nghiên cứu
                </Text>
                <Divider borderWidth={1} />
                {/* Table study */}
                <TableCusTom
                    mt={4}
                    columns={[
                        { key: 'study_name', label: 'Tên nghiên cứu', w: '20%' },
                        { key: 'study_type', label: 'Type', w: '10%' },
                        // { key: 'publication_id', label: 'Publication ID', w: '10%' },
                        { key: 'author', label: 'Tác giả', w: '20%' },
                        { key: 'synopsis', label: 'Tóm tắt', w: '20%' },
                        // { key: 'genotypes', label: 'Genotypes', w: '10%' },
                        { key: 'action', label: '', w: '30%' },
                    ]}
                    data={studies}
                />

                {/* Pagination study */}
                <Pagination currentPage={data?.data?.page || 1} totalPage={data?.data?.totalPages || 1} />

                {/* Modal chi tiết study */}
                <Modal isOpen={isOpenModal} onClose={onCloseModal} size="4xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Detailed information about study</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <InfoCommon title="study_name" content={studies[indexShow]?.study_name} />
                                <InfoCommon title="link_detail_study" content={studies[indexShow]?.link_detail_study} />
                                <InfoCommon title="study_type" content={studies[indexShow]?.study_type} />
                                <InfoCommon title="publication_id" content={studies[indexShow]?.publication_id} />
                                <InfoCommon title="author" content={studies[indexShow]?.author} />
                                <InfoCommon title="description" content={studies[indexShow]?.description} />
                                <InfoCommon title="synopsis" content={studies[indexShow]?.synopsis} />
                                <InfoCommon title="genotypes" content={studies[indexShow]?.genotypes} />
                                <InfoCommon title="species" content={studies[indexShow]?.species} />
                                <InfoCommon title="traits" content={studies[indexShow]?.traits} />
                            </Box>
                        </ModalBody>

                        {/* Button close modal */}      
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Modal confirm xóa study */} 
                <ConfirmDelete
                    header="Xóa Species"
                    title="Bạn chắc chắn muốn xóa Study, hành động này không thể khôi phục."
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onDelete={() => deleteSpecies.mutate(idDelete)}
                />
            </Box>
        </HStack>
    );
};

export default Manager;

type InfoCommonType = {
    title: string;
    content: string;
};
const InfoCommon = ({ title, content }: InfoCommonType) => {
    return (
        <Box mb={4}>
            <Text fontWeight={500} textTransform="capitalize">
                {title}
            </Text>
            <Text textIndent="4px" fontWeight={300}>
                {content}
            </Text>
        </Box>
    );
};
