import { Box, Text } from '@chakra-ui/react';
import Wrapper from '../../templates/Wrapper';
import { useGetPost } from '../../../services/post/get-one';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PostType } from '../../../type/post';
import BasicTemplate from '../../templates/BasicTemplate';
import { formatDate } from '../../../helpers/formatDate';

const PostDetail = () => {
    const { id } = useParams();
    const { data } = useGetPost({ id: id || '' });
    const post = useMemo(() => data?.data as PostType, [data]);
    return (
        <BasicTemplate>
            <Wrapper>
                <Box>
                    <Text fontSize={32} fontWeight={300} mb={4}>
                        {post?.title}
                    </Text>
                    <Text fontSize={14} mb={4}>
                        Posted {post?.author && `by ${post?.author}`} {formatDate(post?.createdAt)}
                    </Text>
                    <Text fontSize={24} fontWeight={300} mb={6}>
                        {post?.sub_title}
                    </Text>
                    <Text>{post?.description}</Text>
                </Box>
            </Wrapper>
        </BasicTemplate>
    );
};

export default PostDetail;
