import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetGeneFamilys } from '../../../../services/geneFamily/get-more';
import { Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import icons from '../../../../constants/icons';
import { routesMap } from '../../../../routes/routes';
import { GeneFamilyResType } from '../../../../type/geneFamily';
import TableCusTom from '../../../molecules/Table';
import Pagination from '../../../molecules/Pagination';

const Manager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 1, [searchParams]);
    const { data } = useGetGeneFamilys({
        rest: { page: page, pageSize: pageSize },
    });

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
                        <HStack>
                            <Button
                                leftIcon={<Icon as={icons.trash} />}
                                bg={'red'}
                                color="white"
                                fontSize={14}
                                variant="variants"
                            >
                                Delete
                            </Button>
                            <Button
                                leftIcon={<Icon as={icons.pen} />}
                                bg={'orange'}
                                color="white"
                                fontSize={14}
                                variant="variants"
                                onClick={() => navigate(routesMap.GeneFamily.replace('/*', `/edit?id=${item._id}`))}
                            >
                                Edit
                            </Button>
                        </HStack>
                    ),
                };
            }) || [],
        [data],
    );

    console.log(geneFamilys);
    return (
        <Box>
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
