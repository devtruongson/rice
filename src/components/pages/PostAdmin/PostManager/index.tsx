import { Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import { useGetPosts } from '../../../../services/post/get-all';
import TableCusTom from '../../../molecules/Table';
import { useMemo } from 'react';
import { PostType } from '../../../../type/post';
import icons from '../../../../constants/icons';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../../../routes/routes';

const PostManager = () => {
    const navigate = useNavigate();
    const { data } = useGetPosts({});
    const posts = useMemo(
        () =>
            data?.data.map((item: PostType) => {
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
        </Box>
    );
};

export default PostManager;
