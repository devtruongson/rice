import {
    Box,
    Divider,
    Grid,
    GridItem,
    Heading,
    Link,
    List,
    ListItem,
    Table,
    Tbody,
    Td,
    Text,
    Tr,
} from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';

const Home = () => {
    // const borderColor = useColorModeValue('gray.200', 'gray.700');
    // const bgColor = useColorModeValue('white', 'gray.800');

    return (
        <MainTemPlate>
            <Grid
                templateColumns={{ base: '1fr', md: 'minmax(200px, 1fr) 3fr minmax(200px, 1fr)' }}
                gap={0}
                bg="gray.100"
            >
                {/* Left Sidebar */}
                <GridItem
                    borderRight="1px"
                    // borderColor={borderColor} bg={bgColor}
                    p={4}
                >
                    <Box mb={6}>
                        <Heading as="h3" size="md" textAlign="center" mb={4}>
                            RGAP 7 Summary
                        </Heading>
                        <Divider />
                        <Heading as="h4" size="sm" mb={3}>
                            Gene Annotation
                        </Heading>
                        <Table size="sm">
                            <Tbody>
                                <Tr>
                                    <Td pl={0}>Total loci</Td>
                                    <Td textAlign="end" fontWeight="bold">
                                        55,986
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>

                        <Table size="sm">
                            <Tbody>
                                {[
                                    { label: ' Non-TE Loci', value: '' },
                                    { label: 'Number', value: '39,049' },
                                    { label: 'Gene models', value: '49,066' },
                                    { label: 'Gene size', value: '2,853 bp' },
                                    { label: 'Exons/gene', value: '4.9' },
                                    { label: 'Introns/gene', value: '3.9' },
                                    { label: ' TE Loci', value: '' },
                                    { label: 'Number', value: '16,937' },
                                    { label: 'Gene models', value: '17,272' },
                                    { label: 'Gene size', value: '3,229 bp' },
                                    { label: 'Exons/gene', value: '4.2' },
                                    { label: 'Introns/gene', value: '3.2' },
                                ].map((item, index) => {
                                    if (index === 0 || index === 6) {
                                        return (
                                            <Heading as="h5" size="xs" ml={1} mt={2} color="gray.700">
                                                {item.label}
                                            </Heading>
                                        );
                                    }
                                    return (
                                        <Tr key={index}>
                                            <Td pl={1}>{item.label}</Td>
                                            <Td textAlign="end">{item.value}</Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Box>

                    <Box mb={6}>
                        <Heading as="h4" size="sm" mb={3}>
                            Genome Browser
                        </Heading>
                        <Link color="red.600" fontWeight="bold">
                            Updated Browse
                        </Link>
                    </Box>
                    <Box mb={6}>
                        <Heading as="h4" size="sm" mb={3}>
                            Popular Tools
                        </Heading>
                        <List pl={2}>
                            {[
                                { title: 'BLAST', href: '' },
                                { title: 'Locus Name Search', href: '' },
                                { title: 'Functional Term Search', href: '' },
                                { title: 'Protein Domain Search', href: '' },
                                { title: 'All Tools', href: '' },
                            ].map((item, index) => {
                                return (
                                    <ListItem key={index}>
                                        <Link color="red.600" href={item.href}>
                                            {item.title}
                                        </Link>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </GridItem>

                {/* Main Content */}
                <GridItem p={6}>
                    <Heading as="h1" size="lg" mb={6} textAlign="center">
                        Introduction to the Rice Genome Annotation Project
                    </Heading>

                    <Box p={4} mb={6} borderWidth="1px" borderColor="gray.300" bg="gray.100">
                        <Text mb={2}>
                            <Text as="span" fontWeight="bold">
                                November 19, 2024 -{' '}
                            </Text>
                            A new <Link color="red.600">paper</Link> describing the recent updates for the Rice Genome
                            Annotation Project website has been published in <Text as="i">Nucleic Acids Research</Text>.
                        </Text>
                    </Box>
                    <Text mb={4}>
                        The Rice Genome Annotation Project Database was initially funded by the National Science
                        Foundation project to provide sequence and annotation data for the rice genome. The September
                        2024 update was made through funding from the Georgia Research Alliance, Georgia Seed
                        Development, and the University of Georgia.
                    </Text>
                    <Text mb={4}>
                        This website provides genome sequence from the Nipponbare subspecies of rice and annotation of
                        the 12 rice chromosomes. These data are available through{' '}
                        <Link color="red.600">search pages</Link> and <Link color="red.600">Genome Browser</Link> that
                        provides an integrated display of annotation data.
                    </Text>
                    <Heading as="h3" size="md" my={4} textAlign="center">
                        Release 7 - Unified Rice Pseudomolecules
                    </Heading>
                    <Text mb={4}>
                        In cooperation with researchers at the Agrogenomics Research Center at the National Institute of
                        Agrobiological Sciences, Tsukuba, Japan, we have prepared a final assembly of the rice
                        pseudomolecules. These pseudomolecule sequences are now common to both the Rice Genome
                        Annotation Project (RGAP) and the{' '}
                        <Link color="red.600">Rice Annotation Project Database (RAP-DB)</Link> International Rice Genome
                        Sequencing Project. The joint web interface in preparation will allow researchers to easily
                        compare annotations from both projects. Gene loci, gene models and associated annotations
                        created by RGAP and RAP-DB were independently derived, but the pseudomolecules used by the two
                        rice annotation projects to generate those annotations are now identical and can be easily
                        compared. A manuscript describing the generation of the final rice pseudomolecule assembly is in
                        preparation.
                    </Text>
                    <Heading as="h3" size="md" my={4}>
                        Use of the Rice Genome Annotation Project (RGAP) Rice Gene Models by Other Websites/Databases
                    </Heading>
                    <Text mb={4}>
                        While many researchers utilize the RGAP loci, gene models and transcripts in their own databases
                        and genome browsers, these sites may have outdated annotation and may have modified or further
                        annotated our official gene set. All RGAP rice gene names are of the form{' '}
                        <Text as="i">LOC_Os##g#####</Text> as explained on our{' '}
                        <Link color="red.600">nomenclature page</Link>. RGAP rice genes are created using{' '}
                        <Text as="i">de novo</Text> gene predictions from Fgenesh followed by improvements and/or
                        modifications by the PASA program which uses other <Text as="i">de novo</Text> gene prediction
                        software and rice <Link color="red.600">full length cDNA and EST alignments</Link>. Our gene set
                        is constructed entirely "in house" and is not equivalent to annotation from RefSeq, RAP,
                        SwissProt or UniProt. Because we can not guarantee that data that is labeled as MSU/TIGR RGAP
                        rice, or other variations, are really our data, we suggest that users always refer to the Rice
                        Genome Annotation Project for our genuine and current RGAP rice gene data.
                    </Text>

                    <Divider />

                    <Box mb={6}>
                        <Text fontWeight="bold" mb={2}>
                            Researchers who wish to cite the Rice Genome Annotation Project website are encouraged to
                            refer to these publications:
                        </Text>
                        <List pl={6}>
                            <ListItem mb={4}>
                                Kawahara, Y., de la Bastide, M., Hamilton, J.P., Kanamori, H., McCombie, W.R., Ouyang,
                                S., Schwartz, D.C., Tanaka, T., Wu, J., Zhou, S., Childs, K.L., Davidson, R.M., Lin, H.,
                                Quesada-Ocampo, L., Vaillancourt, B., Sakai, H., Lee, S.S., Kim, J., Numa, H., Itoh, T.,
                                Buell, C. R., Matsumoto, T. 2013. Improvement of the Oryza sativa Nipponbare reference
                                genome using next generation sequence and optical map data. <Text as="i">Rice</Text>{' '}
                                6:4.
                            </ListItem>
                            <ListItem>
                                Hamilton, J. P., Lin, C., Buell, C. R. 2024. The rice genome annotation project: an
                                updated database for mining the rice genome. <Text as="i">Nucleic Acids Research</Text>,
                                gkae1061, https://doi.org/10.1093/nar/gkae1061
                            </ListItem>
                        </List>
                    </Box>
                </GridItem>

                {/* Right Sidebar */}
                <GridItem
                    borderLeft="1px"
                    //  borderColor={borderColor} bg={bgColor}
                    p={4}
                >
                    <Box mb={6}>
                        <Heading as="h3" size="md" textAlign="center" mb={4}>
                            RGAP Updates
                        </Heading>
                        <Divider />

                        <Box mb={4}>
                            <Text fontWeight="bold" color="red.600">
                                November 19, 2024
                            </Text>
                            <Text>
                                A new <Link color="red.600">paper</Link> describing the recent updates for the Rice
                                Genome Annotation Project website has been published in{' '}
                                <Text as="i">Nucleic Acids Research</Text>.
                            </Text>
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold" color="red.600">
                                September 2024
                            </Text>
                            <Text>
                                The Rice Genome Annotation Project website has been updated. The{' '}
                                <Link color="red.600">genome browser</Link> has been updated to{' '}
                                <Link color="red.600">browse</Link> the more <Link color="red.600">expression</Link> and{' '}
                                <Link color="red.600">compression data and metadata</Link> that were recently updated.
                                There is also a new <Link color="red.600">syntelog page</Link> with data for the new
                                syntelog data sets. A new <Link color="red.600">download page</Link> has been released
                                with the{' '}
                                <Link color="red.600">updated datasets and new binary alignment and format files</Link>.
                                The website has also been upgraded to use <Link color="red.600">HTTPS</Link> for
                                security and better compatibility with modern web browsers.
                            </Text>
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold" color="red.600">
                                July 1, 2021
                            </Text>
                            <Text>
                                The <Link color="red.600">Buell Lab</Link> has moved to the University of Georgia. The
                                new URL for the Rice Genome Annotation Project (RGAP) website is rice.uga.edu.
                            </Text>
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold" color="red.600">
                                February 6, 2013
                            </Text>
                            <Text>
                                A <Link color="red.600">paper</Link> describing the unified rice pseudomolecules,
                                reference genome, and <Link color="red.600">pseudomolecules</Link> and 2012 Rice Genome
                                Annotation Project Release 7 has been published.
                            </Text>
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </MainTemPlate>
    );
};

export default Home;
