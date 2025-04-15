import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { routesMap } from '../../../routes/routes';
import { PostType } from '../../../type/post';
import colors from '../../../constants/colors';
import { blogsDefault } from '../../../constants';
import { useGetPostByType } from '../../../services/post/get-by-type';

const Post = () => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const type = useMemo(() => {
        if (pathname === routesMap.Blog) {
            return 'blog';
        }
        if (pathname === routesMap.Event) {
            return 'event';
        }
        return 'new';
    }, [pathname]);

    const { data } = useGetPostByType({ rest: { type: type, page: 1, pageSize: 10 } });

    const isBlogPage = useMemo(() => pathname === routesMap.Blog, [pathname]);
    const title = useMemo(() => {
        if (isBlogPage) {
            return 'Blog';
        }
        if (pathname === routesMap.New) {
            return 'News';
        }
        if (pathname === routesMap.Event) {
            return 'Events';
        }
        return '';
    }, [isBlogPage, pathname]);

    const handleNavigate = useCallback(
        (id: string) => {
            navigate(routesMap.PostDetail.replace(':id', id));
        },
        [isBlogPage, navigate, pathname],
    );

    return (
        <MainTemPlate>
            <Box w="full">
                <Text fontSize={36} fontWeight={300} mb={20}>
                    {title}
                </Text>

                {isBlogPage && <ItemCommon data={blogsDefault} handleNavigate={handleNavigate} />}

                {data?.data?.length > 0
                    ? data?.data?.map((item: PostType) => {
                          return <ItemCommon data={item} key={item?._id} handleNavigate={handleNavigate} />;
                      })
                    : null}
            </Box>
        </MainTemPlate>
    );
};

export default Post;
type ItemCommonProps = {
    data: PostType;
    handleNavigate: (id: string) => void;
};
const ItemCommon = ({ data, handleNavigate }: ItemCommonProps) => {
    return (
        <Box w="full">
            <VStack
                w="full"
                alignItems="start"
                py={4}
                cursor="pointer"
                _hover={{ bg: '#f4f4f4' }}
                onClick={() => handleNavigate(data?._id)}
            >
                <HStack>
                    <Text fontWeight={600} color={colors.brand}>
                        {data?.title}
                    </Text>
                    <Text>|</Text>
                    <Text>{data?.author}</Text>
                    <Text>,</Text>
                    <Text>
                        {new Date(data?.createdAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                        })}
                    </Text>
                </HStack>
                <Text>{data?.sub_title}</Text>
            </VStack>
            <Divider borderColor={'#ccc'} />
        </Box>
    );
};
