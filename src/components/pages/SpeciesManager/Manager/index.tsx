import { useNavigate } from 'react-router-dom';
import { useGetSpecies } from '../../../../services/species/get-all';
import { useMemo } from 'react';
import { SpeciesResType } from '../../../../type/species';
import ActionCustom from '../../../molecules/ActionCustom';
import { routesMap } from '../../../../routes/routes';
import { Box, Text } from '@chakra-ui/react';
import TableCusTom from '../../../molecules/Table';

const Manager = () => {
    const navigate = useNavigate();

    const { data } = useGetSpecies({});
    const posts = useMemo(
        () =>
            data?.data?.map((item: SpeciesResType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {}}
                            actionEdit={() => navigate(routesMap.Species.replace('/*', `/edit?id=${item._id}`))}
                        />
                    ),
                };
            }) || [],
        [data],
    );

    return (
        <Box>
            <Text>Post Manager</Text>
            <TableCusTom
                columns={[
                    { key: 'name', label: 'name', w: '60%' },
                    { key: 'action', label: '', w: '15%' },
                ]}
                data={posts}
            />
        </Box>
    );
};

export default Manager;
