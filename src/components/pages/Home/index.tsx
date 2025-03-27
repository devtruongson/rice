import { Box, Button, Divider, Flex, HStack, Image, Input, Text, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import { listTransitFirst, personalBrand } from '../../../constants';
import LinkCustom from '../../atoms/Link';
import { useState } from 'react';

const listStransit = [
    { label: 'Keyword Search', list: listTransitFirst },
    { label: 'Keyword Search', list: listTransitFirst },
    { label: 'Keyword Search', list: listTransitFirst },
];
const Home = () => {
    const [textSearch, setTextSearch] = useState('');

    const handleSearch = () => {};
    return (
        <MainTemPlate>
            <Flex p={20}>
                <Box w="70%">
                    <Text fontSize={36} fontWeight={300} mb={2}>
                        {personalBrand}
                    </Text>
                    <Text mb={4}>
                        SoyBase integrates genetic and genomic information to aid soybean breeders and researchers. This
                        instance of the site has been ported to a different framework in order to accommodate the
                        rapidly-growing genomic data available. In the meantime, you can also continue to use{' '}
                        <LinkCustom content='"legacy SoyBase"' path="https://legacy.soybase.org/" isBlank />.
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
                                            value={textSearch}
                                            onChange={(e) => setTextSearch(e.target.value)}
                                        />
                                        <Button onClick={handleSearch}>GO</Button>
                                    </HStack>
                                    <Divider borderColor="#ccc" mb={4} />
                                    <VStack w="full" gap={2}>
                                        {item?.list?.length
                                            ? item?.list?.map((itemChild, indexChild) => {
                                                  return (
                                                      <Box key={indexChild} w="full" py={2} bg="yellow.300">
                                                          <LinkCustom
                                                              content={itemChild.label}
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
                        SoyBase is funded by the USDA-ARS. SoyBase is developed and hosted by the USDA-ARS SoyBase and
                        Legume Clade Database group at Ames, IA, with development assistance from the National Center
                        for Genome Resources (NCGR) with the help of many other researchers in the soybean community.
                    </Text>
                    <HStack justifyContent="space-around">
                        <Image src="https://www.soybase.org/assets/img/usda.svg" w={150} />
                        <Image src="https://www.soybase.org/assets/img/ncgr.png" w={200} />
                    </HStack>
                </Box>

                <Box w="30%"></Box>
            </Flex>
        </MainTemPlate>
    );
};

export default Home;
