import { Box, Divider, Flex, HStack, Image, Input, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogsDefault, listTransitFirst, listTransitSecond, listTranstLast, personalBrand } from '../../../constants';
import { formatDate } from '../../../helpers/formatDate';
import { routesMap } from '../../../routes/routes';
import { useGetPostByType } from '../../../services/post/get-by-type';
import { PostType } from '../../../type/post';
import ButtonCustom from '../../atoms/Button';
import LinkCustom from '../../atoms/Link';
import MainTemPlate from '../../templates/MainTemPlate';

const listStransit = [
    { label: 'Tìm kiếm từ khóa', list: listTransitFirst, search: 'keyword' },
    { label: 'Tìm kiếm định danh gen', list: listTransitSecond, search: 'identifier' },
    { label: 'Trình xem cú pháp', list: listTranstLast, search: 'synteny' },
] as const;

const Home = () => {
    const [textSearch, setTextSearch] = useState<{
        keyword: string;
        identifier: string;
        synteny: string;
    }>({
        identifier: 'Glyma.15g026400',
        keyword: 'seed "weight"2w6',
        synteny: 'Glyma.20G0100006',
    });
    const navigate = useNavigate();

    const handleSearch = (index?: number) => {
        if (index !== 0) {
            navigate(routesMap.Search);
        }

        if (index === 0) {
            window.open(
                `https://mines.legumeinfo.org/glycinemine/keywordSearchResults.do?searchTerm=${textSearch.keyword}&searchSubmit=`,
                '_blank',
                'noopener,noreferrer',
            );
        }
    };
    return (
        <MainTemPlate>
            <Flex justifyContent="space-between">
                <Box w="70%">
                    <Text fontSize={36} fontWeight={300} mb={2}>
                        {personalBrand}
                    </Text>
                    <Text mb={4}>
                        Cassava tích hợp thông tin di truyền và bộ gen để hỗ trợ các nhà lai tạo và nghiên cứu cây Sắn.
                        Trường hợp này của trang web đã được chuyển sang một khuôn khổ khác để phù hợp với dữ liệu bộ
                        gen đang phát triển nhanh chóng hiện có. Trong thời gian chờ đợi, bạn cũng có thể tiếp tục sử
                        dụng <LinkCustom content='"legacy Cassava"' path="https://legacy.soybase.org/" isBlank />.
                    </Text>

                    <HStack w="full" justifyContent="space-between" mb={6}>
                        {listStransit.map((item, index) => {
                            return (
                                <Box key={index} w="30%">
                                    <Text textAlign="center" mb={2}>
                                        {item.label}
                                    </Text>
                                    <HStack w="full" justifyContent="center" mb={4}>
                                        <Input
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            fontStyle={'italic'}
                                            color={'rgb(35, 86, 38)'}
                                            borderRadius={'4px'}
                                            w="60%"
                                            h={'30px'}
                                            value={textSearch[item.search]}
                                            onChange={(e) =>
                                                setTextSearch((prev) => {
                                                    return {
                                                        ...prev,
                                                        [item.search]: e.target.value,
                                                    };
                                                })
                                            }
                                            py={0}
                                            px={2}
                                        />
                                        <ButtonCustom
                                            borderRadius={'4px'}
                                            text="đi"
                                            action={() => handleSearch(index)}
                                            h={'30px'}
                                        />
                                    </HStack>
                                    <Divider borderColor="#ccc" mb={4} />
                                    <VStack w="full" gap={2}>
                                        {item?.list?.length
                                            ? item?.list?.map((itemChild, indexChild) => {
                                                  return (
                                                      <Box key={indexChild} w="full" py={1} bg="yellow.200">
                                                          <LinkCustom
                                                              content={itemChild.label}
                                                              fontWeight={500}
                                                              path={itemChild.path}
                                                              textAlign="center"
                                                          />
                                                      </Box>
                                                  );
                                              })
                                            : null}
                                    </VStack>
                                </Box>
                            );
                        })}
                    </HStack>

                    <Text fontSize={28} mb={8}>
                        Tài trợ và phát triển
                    </Text>
                    <Text mb={6}>
                        Cassava được tài trợ bởi USDA-ARS. Cassava được phát triển và lưu trữ bởi nhóm Cơ sở dữ liệu cây
                        Sắn và Họ sắn USDA-ARS tại Ames, IA, với sự hỗ trợ phát triển từ Trung tâm Quốc gia về Tài
                        nguyên bộ gen (NCGR) với sự giúp đỡ của nhiều nhà nghiên cứu khác trong cộng đồng cây sắn.
                    </Text>
                    <HStack justifyContent="space-around">
                        <Image src="https://www.soybase.org/assets/img/usda.svg" w={150} />
                        <Image src="https://www.soybase.org/assets/img/ncgr.png" w={200} />
                    </HStack>
                </Box>

                <Box w="25%">
                    <VStack gap={10} w="100%">
                        <FormPostCommon label="bài đăng trên blog" path={routesMap.Blog} isBlog type="blog" />
                        <FormPostCommon label="Bài viết mới" path={routesMap.New} type="new" />
                        <FormPostCommon label="Bài đăng sự kiện" path={routesMap.Event} type="event" />
                    </VStack>
                </Box>
            </Flex>
        </MainTemPlate>
    );
};

export default Home;

type FormPostCommonProps = {
    label: string;
    path: string;
    isBlog?: boolean;
    type: string;
};
const FormPostCommon = ({ label, path, isBlog = false, type }: FormPostCommonProps) => {
    const { data: postData } = useGetPostByType({ rest: { type: type, page: 1, pageSize: 3 } });
    const posts = useMemo(() => (postData?.data?.data as PostType[]) || [], [postData]);
    return (
        <Box shadow="md" w="full">
            <Box fontWeight={200} fontSize={28} p={4}>
                {label}
            </Box>
            <Divider />
            <Box p={4}>
                <UnorderedList>
                    {type === 'blog' ? (
                        <ListItem mb={2}>
                            <LinkCustom content={blogsDefault.title} path={blogsDefault.path} fontWeight={500} />
                            {!isBlog && <Text>{blogsDefault.createdAt}</Text>}
                        </ListItem>
                    ) : null}
                    {posts?.length > 0
                        ? posts?.map((item, index) => {
                              return (
                                  <ListItem key={index} mb={2}>
                                      <LinkCustom
                                          content={item.title}
                                          path={routesMap.PostDetail.replace('/:id', `/${item?._id}`)}
                                          fontWeight={500}
                                      />
                                      {!isBlog && <Text>{formatDate(item?.createdAt)}</Text>}
                                  </ListItem>
                              );
                          })
                        : null}
                </UnorderedList>
            </Box>
            <Divider />
            <Box p={4}>
                <Link to={path}>
                    <Text textTransform="uppercase">Thêm {label}</Text>
                </Link>
            </Box>
        </Box>
    );
};
