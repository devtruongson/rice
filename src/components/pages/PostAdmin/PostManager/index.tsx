import { Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import TableCusTom from '../../../molecules/Table';
import { useMemo } from 'react';
import { PostType } from '../../../../type/post';
import icons from '../../../../constants/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routesMap } from '../../../../routes/routes';
import Pagination from '../../../molecules/Pagination';
import { useGetPostByType } from '../../../../services/post/get-by-type';

const PostManager = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
    const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 1, [searchParams]);
    const { data } = useGetPostByType({
        rest: { type: '', page: page, pageSize: pageSize },
    });
    const posts = useMemo(
        () =>
            data?.data?.data?.map((item: PostType) => {
                return {
                    ...item,
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
                                onClick={() => navigate(routesMap.PostAdmin.replace('/*', `/edit?id=${item._id}`))}
                            >
                                Edit
                            </Button>
                        </HStack>
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
                    { key: 'title', label: 'Title', w: '10%' },
                    { key: 'sub_title', label: 'Sub Title', w: '20%' },
                    { key: 'author', label: 'Author', w: '10%' },
                    { key: 'description', label: 'description', w: '40%' },
                    { key: 'type', label: 'Type', w: '5%' },
                    { key: 'action', label: '', w: '15%' },
                ]}
                data={posts}
            />
            <Pagination currentPage={data?.data?.page || 1} totalPage={data?.data?.totalPages || 1} />
        </Box>
    );
};

export default PostManager;
