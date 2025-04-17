import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetStrains } from '../../../../services/strain/get-all';
import { StrainResType } from '../../../../type/strain';
import { Box, Text } from '@chakra-ui/react';
import { routesMap } from '../../../../routes/routes';
import TableCusTom from '../../../molecules/Table';
import ActionCustom from '../../../molecules/ActionCustom';

const Manager = () => {
    const navigate = useNavigate();

    const { data } = useGetStrains({});
    const posts = useMemo(
        () =>
            data?.data?.map((item: StrainResType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {}}
                            actionEdit={() => navigate(routesMap.Strain.replace('/*', `/edit?id=${item._id}`))}
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
