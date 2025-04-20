import { Box, Divider, HStack, Text, useDisclosure } from '@chakra-ui/react';
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

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDelete, setIdDelete] = useState<string>('');

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

    const { data, refetch } = useGetStudies({ rest: { page: page, pageSize: pageSize } });
    const studies = useMemo(
        () =>
            data?.data?.data?.map((item: StudyResType) => {
                return {
                    ...item,
                    species: item?.species?.name || '',
                    action: (
                        <ActionCustom
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
                    Study Manager
                </Text>
                <Divider borderWidth={1} />
                <TableCusTom
                    mt={4}
                    columns={[
                        { key: 'study_name', label: 'Study Name', w: '10%' },
                        { key: 'link_detail_study', label: 'Link Detail', w: '10%' },
                        { key: 'study_type', label: 'Type', w: '10%' },
                        { key: 'publication_id', label: 'Publication ID', w: '10%' },
                        { key: 'author', label: 'Author', w: '10%' },
                        { key: 'synopsis', label: 'Synopsis', w: '10%' },
                        { key: 'description', label: 'Description', w: '10%' },
                        { key: 'genotypes', label: 'Genotypes', w: '10%' },
                        // { key: 'traits', label: 'Traits', w: '10%' },
                        // { key: 'species', label: 'Species', w: '10%' },
                        { key: 'action', label: '', w: '5%' },
                    ]}
                    data={studies}
                />

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
