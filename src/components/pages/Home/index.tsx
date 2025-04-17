import { Box, Divider, Flex, HStack, Image, Input, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import { listTransitFirst, listTransitSecond, personalBrand, listTranstLast, blogsDefault } from '../../../constants';
import LinkCustom from '../../atoms/Link';
import { useMemo, useState } from 'react';
import ButtonCustom from '../../atoms/Button';
import { PostType } from '../../../type/post';
import { Link, useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';
import { useGetPostByType } from '../../../services/post/get-by-type';
import { formatDate } from '../../../helpers/formatDate';

const listStransit = [
    { label: 'Keyword Search', list: listTransitFirst },
    { label: 'Gene identifier search', list: listTransitSecond },
    { label: 'Synteny viewer', list: listTranstLast },
];
const Home = () => {
    const [textSearch, setTextSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(routesMap.Search);
    };
    return (
        <MainTemPlate>
            <Flex justifyContent="space-between">
                <Box w="75%">
                    <Text fontSize={36} fontWeight={300} mb={2}>
                        {personalBrand}
                    </Text>
                    <Text mb={4}>
                        Cassava integrates genetic and genomic information to aid soybean breeders and researchers. This
                        instance of the site has been ported to a different framework in order to accommodate the
                        rapidly-growing genomic data available. In the meantime, you can also continue to use{' '}
                        <LinkCustom content='"legacy Cassava"' path="https://legacy.soybase.org/" isBlank />.
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
                                            w="40%"
                                            h={8}
                                            value={textSearch}
                                            onChange={(e) => setTextSearch(e.target.value)}
                                            borderRadius={0}
                                            py={0}
                                            px={2}
                                        />
                                        <ButtonCustom text="GO" action={handleSearch} h={8} />
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
                        Funding and Development
                    </Text>
                    <Text mb={6}>
                        Cassava is funded by the USDA-ARS. Cassava is developed and hosted by the USDA-ARS Cassava and
                        Legume Clade Database group at Ames, IA, with development assistance from the National Center
                        for Genome Resources (NCGR) with the help of many other researchers in the soybean community.
                    </Text>
                    <HStack justifyContent="space-around">
                        <Image src="https://www.soybase.org/assets/img/usda.svg" w={150} />
                        <Image src="https://www.soybase.org/assets/img/ncgr.png" w={200} />
                    </HStack>
                </Box>

                <Box w="20%">
                    <VStack gap={10} w="100%">
                        <FormPostCommon label="Blog posts" path={routesMap.Blog} isBlog type="blog" />
                        <FormPostCommon label="New posts" path={routesMap.New} type="new" />
                        <FormPostCommon label="Event posts" path={routesMap.Event} type="event" />
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
    const posts = useMemo(() => (postData?.data as PostType[]) || [], [postData]);
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
                    <Text textTransform="uppercase">More {label}</Text>
                </Link>
            </Box>
        </Box>
    );
};
