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
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from '../../../../libs/toast';
import { useDeleteGene } from '../../../../services/gene/delete';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useGetGenes } from '../../../../services/gene/get-genes';
import TableCusTom from '../../../molecules/Table';
import ConfirmDelete from '../../../molecules/ConfirmDelete';
import { GeneResType } from '../../../../type/gene';
import ActionCustom from '../../../molecules/ActionCustom';
import { routesMap } from '../../../../routes/routes';

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDelete, setIdDelete] = useState<string>('');
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const [indexShow, setIndexShow] = useState(0);

    const deleteSpecies = useDeleteGene({
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

    const { data, refetch } = useGetGenes({ rest: { page: page, pageSize: pageSize } });
    const genes = useMemo(
        () =>
            data?.data?.data?.map((item: GeneResType, index: number) => {
                return {
                    ...item,
                    go_terms: item?.go_terms?.join(', ') || '',
                    gene_family: item?.gene_family?.name || '',
                    pan_gene_set: item?.pan_gene_set?.name || '',
                    species: item?.species?.name || '',
                    strain: item?.strain?.name || '',
                    identifier: `${item?.identifier?.name} (${item?.identifier?.path_detail})`,
                    location: `${item?.location?.name} (${item?.location?.path_detail})`,
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
                            actionEdit={() => navigate(routesMap.Gene.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    return (
        <HStack justifyContent="center" w="full">
            <Box w="100%" rounded={4} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                <Button display="none" />
                <Text textAlign="start" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                    Post Manager
                </Text>
                <Divider borderWidth={1} />
                <Box maxW="100%" overflowX="auto">
                    <TableCusTom
                        mt={4}
                        w="full"
                        columns={[
                            { key: 'name', label: 'name', w: '10%' },
                            { key: 'arabidopsis_hit', label: 'Arabidopsis Hit', w: '10%' },
                            { key: 'go_terms', label: 'Go Terms', w: '5%' },
                            { key: 'description', label: 'Description', w: '10%' },
                            { key: 'gene_family', label: 'Gene Family', w: '10%' },
                            { key: 'pan_gene_set', label: 'PanGene Set', w: '10%' },
                            { key: 'action', label: '', w: '10%' },
                        ]}
                        data={genes}
                    />
                </Box>

                <Modal isOpen={isOpenModal} onClose={onCloseModal} size="4xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Detailed information about genes</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <InfoCommon title="Name" content={genes[indexShow]?.name} />
                                <InfoCommon title="arabidopsis hit" content={genes[indexShow]?.arabidopsis_hit} />
                                <InfoCommon title="go terms" content={genes[indexShow]?.go_terms} />
                                <InfoCommon title="identifier" content={genes[indexShow]?.identifier} />
                                <InfoCommon title="location" content={genes[indexShow]?.location} />
                                <InfoCommon title="description" content={genes[indexShow]?.description} />
                                <InfoCommon title="gene family" content={genes[indexShow]?.gene_family} />
                                <InfoCommon title="pan gene_set" content={genes[indexShow]?.pan_gene_set} />
                                <InfoCommon title="genus" content={genes[indexShow]?.genus} />
                                <InfoCommon title="species" content={genes[indexShow]?.species} />
                                <InfoCommon title="strain" content={genes[indexShow]?.strain} />
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Xóa Gene"
                    title="Bạn chắc chắn muốn xóa Gene, hành động này không thể khôi phục."
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
