import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { routesMap } from '../../../routes/routes';
import { PostType } from '../../../type/post';
import colors from '../../../constants/colors';
import { blogsDefault } from '../../../constants';

const posts = [
    // {
    //     id: '1',
    //     title: 'SBW2026 Theme Announced',
    //     date: '25 March 2025',
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    //     path: routesMap.GoEnrichmentBlog,
    // },
] as PostType[];

const Post = () => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

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
            let path = '';
            if (isBlogPage && !id) {
                path = routesMap.GoEnrichmentBlog;
            } else {
                path = `${pathname}/${id}`;
            }
            navigate(path);
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

                {posts?.length > 0
                    ? posts?.map((item) => {
                          return <ItemCommon data={item} key={item?.id} handleNavigate={handleNavigate} />;
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
                onClick={() => handleNavigate(data?.id)}
            >
                <HStack>
                    <Text fontWeight={600} color={colors.brand}>
                        {data?.title}
                    </Text>
                    <Text>|</Text>
                    <Text>{data?.date}</Text>
                </HStack>
                <Text>{data?.description}</Text>
            </VStack>
            <Divider borderColor={'#ccc'} />
        </Box>
    );
};
