import { useNavigate } from 'react-router-dom';
import { useGetSpecies } from '../../../../services/species/get-all';
import { useMemo, useState } from 'react';
import { SpeciesResType } from '../../../../type/species';
import { routesMap } from '../../../../routes/routes';
import { Box, Button, Divider, HStack, Text, useDisclosure } from '@chakra-ui/react';
import TableCusTom from '../../../molecules/Table';
import ConfirmDelete from '../../../molecules/ConfirmDelete';
import ActionCustom from '../../../molecules/ActionCustom';
import { useDeleteSpecies } from '../../../../services/species/delete';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';

const Manager = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDelete, setIdDelete] = useState<string>('');

    const deleteSpecies = useDeleteSpecies({
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

    const { data, refetch } = useGetSpecies({});
    const posts = useMemo(
        () =>
            data?.data?.map((item: SpeciesResType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {
                                setIdDelete(item._id);
                                onOpen();
                            }}
                            actionEdit={() => navigate(routesMap.Species.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    return (
        <HStack justifyContent="center">
            <Box w="80%" rounded={4} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                <Button display="none" />
                <Text textAlign="start" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                    Post Manager
                </Text>
                <Divider borderWidth={1} />
                <TableCusTom
                    mt={4}
                    columns={[
                        { key: 'name', label: 'name', w: '60%' },
                        { key: 'action', label: '', w: '15%' },
                    ]}
                    data={posts}
                />

                <ConfirmDelete
                    header="Xóa Species"
                    title="Bạn chắc chắn muốn xóa specie, hành động này không thể khôi phục."
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
