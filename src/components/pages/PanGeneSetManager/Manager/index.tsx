import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPanGeneSets } from '../../../../services/panGeneSet/get-more';
import { PanGeneSetResType } from '../../../../type/panGeneSet';
import { Box, Text } from '@chakra-ui/react';
import { routesMap } from '../../../../routes/routes';
import ActionCustom from '../../../molecules/ActionCustom';
import TableCusTom from '../../../molecules/Table';
import Pagination from '../../../molecules/Pagination';

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);
    const { data } = useGetPanGeneSets({
        rest: { type: '', page: page, pageSize: pageSize },
    });
    const posts = useMemo(
        () =>
            data?.data?.data?.map((item: PanGeneSetResType) => {
                return {
                    ...item,
                    action: (
                        <ActionCustom
                            actionDelete={() => {}}
                            actionEdit={() => navigate(routesMap.PanGeneSet.replace('/*', `/edit?id=${item._id}`))}
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
                    { key: 'name', label: 'name', w: '10%' },
                    { key: 'path_detail', label: 'Path Detail', w: '20%' },

                    { key: 'action', label: '', w: '15%' },
                ]}
                data={posts}
            />
            <Pagination currentPage={data?.data?.page || 1} totalPage={data?.data?.totalPages || 1} />
        </Box>
    );
};

export default Manager;
