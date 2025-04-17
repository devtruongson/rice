import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Divider,
    Image,
    ListItem,
    Text,
    UnorderedList,
    VStack,
} from '@chakra-ui/react';
import BasicTemplate from '../../../templates/BasicTemplate';
import { blogsDefault, personalBrand } from '../../../../constants';
import LinkCustom from '../../../atoms/Link';
import colors from '../../../../constants/colors';
import { formatDate } from '../../../../helpers/formatDate';

const listOne = {
    data: [
        'glyma.Wm82.gnm4.ann1.Glyma.01G022700, glyma.Wm82.gnm4.ann1.Glyma.01G035000',
        'glyma.Wm82.gnm4.ann1.Glyma.01G041400, glyma.Wm82.gnm4.ann1.Glyma.01G041450',
        'glyma.Wm82.gnm4.ann1.Glyma.01G042100, glyma.Wm82.gnm4.ann1.Glyma.01G081600',
        'glyma.Wm82.gnm4.ann1.Glyma.01G081700, glyma.Wm82.gnm4.ann1.Glyma.01G105000',
        'glyma.Wm82.gnm4.ann1.Glyma.01G112500, glyma.Wm82.gnm4.ann1.Glyma.01G113400',
    ],
    image: 'https://www.soybase.org/assets/img/blog_images/GO_set1_biological.gif',
};
const listTwo = {
    data: [
        'glyma.Wm82.gnm4.ann1.Glyma.01G128700, glyma.Wm82.gnm4.ann1.Glyma.01G155300',
        'glyma.Wm82.gnm4.ann1.Glyma.03G041600, glyma.Wm82.gnm4.ann1.Glyma.03G146200',
        'glyma.Wm82.gnm4.ann1.Glyma.05G158300, glyma.Wm82.gnm4.ann1.Glyma.08G116000',
        'glyma.Wm82.gnm4.ann1.Glyma.09G194900, glyma.Wm82.gnm4.ann1.Glyma.09G279900',
        'glyma.Wm82.gnm4.ann1.Glyma.11G089400, glyma.Wm82.gnm4.ann1.Glyma.13G162500',
    ],
    image: 'https://www.soybase.org/assets/img/blog_images/GO_set2_cellular.gif',
};
const listThree = {
    data: [
        'glyma.Wm82.gnm4.ann1.Glyma.01G032400, glyma.Wm82.gnm4.ann1.Glyma.01G032900',
        'glyma.Wm82.gnm4.ann1.Glyma.01G033200, glyma.Wm82.gnm4.ann1.Glyma.01G033300',
        'glyma.Wm82.gnm4.ann1.Glyma.01G039000, glyma.Wm82.gnm4.ann1.Glyma.01G046900',
        'glyma.Wm82.gnm4.ann1.Glyma.01G060300, glyma.Wm82.gnm4.ann1.Glyma.01G112200',
        'glyma.Wm82.gnm4.ann1.Glyma.01G112300, glyma.Wm82.gnm4.ann1.Glyma.01G125300',
    ],
    image: 'https://www.soybase.org/assets/img/blog_images/GO_set3_molecular.gif',
};
const GoEnrichmentBlog = () => {
    return (
        <BasicTemplate size="small">
            <Box>
                <Text fontWeight={300} fontSize={36} mb={4}>
                    {blogsDefault?.title}
                </Text>
                <Text mb={4}>
                    Posted by {blogsDefault?.author} on {formatDate(blogsDefault?.createdAt)}
                </Text>
                <Text fontSize={24} fontWeight={300} mb={4}>
                    {blogsDefault?.description}
                </Text>
                <Text mb={4}>
                    <Text as={'span'} fontWeight={600}>
                        GO enrichment analysis
                    </Text>{' '}
                    uses statistical tests to determine if a set of provided genes are statistically different than a
                    comparison set (typically, the set of all genes in the organism), for each of the three main gene
                    ontology aspects.
                </Text>
                <Text mb={4}>
                    <LinkCustom
                        content="Gene Ontology (GO)"
                        path="https://geneontology.org/docs/ontology-documentation/"
                        isBlank
                        as="span"
                    />{' '}
                    is a classification system that describes three aspects of gene function:
                </Text>
                <UnorderedList mb={3}>
                    <ListItem>
                        Molecular Function, describing activities such as catalytic activity or finer-scale activities
                        such as lipoprotein lipase activity;
                    </ListItem>
                    <ListItem>
                        Cellular Component, describing cellular components such as the cytoskeleton, or finer-scale
                        locations such as centrosome;
                    </ListItem>
                    <ListItem>
                        Biological Process, describing biological programs such as signal transduction, or finer-scale
                        processes such as protein serine/threonine kinase activity.
                    </ListItem>
                </UnorderedList>
                <Text mb={6}>{personalBrand} offers two methods for calculating GO enrichment.</Text>
                <Text fontSize={36} fontWeight={300} mb={4}>
                    1. Use the custom service at the Cassava tools page
                </Text>
                <Text mb={6}>
                    {
                        'The <a href=”/tools/analysis/go.html target=”_blank>tools/analysis/go.html</a> page offers services for annotating your gene list with GO accessions and for calculating GO enrichment, using the method described in Morales et al. (2013). The gene IDs need to be from the Wm82.a4.v1 assembly and annotation (aka Wm82.gnm4.ann1). Try the provided sample identifiers at the page to see the results.'
                    }
                </Text>
                <Text fontSize={36} fontWeight={300} mb={4}>
                    2. Use the GO enrichment tool at GlycineMine.
                </Text>
                <Text mb={6}>
                    At GlycineMine, enrichment can be calculated for genes from ANY Glycine accession and annotation in
                    GlycineMine (there are more than 50 annotation sets as of mid-2024).
                    <br />
                    Here are the steps:
                </Text>

                <Text fontSize={24} fontWeight={300} mb={4}>
                    1. Enter a gene list under Analyze a List.
                </Text>
                <Text mb={4}>
                    Open GlycineMine, and paste a list of genes in the central box (“Analyze a List”). The list can
                    consist of un-prefixed gene IDs such as Glyma.01G022700, but if that gene exists in multiple
                    assemblies or annotation sets, you will see an intermediate page in which you will be asked to
                    select which genes you want to analyze. Therefore, it is generally best to prefix your identifiers
                    with the following four, dot-separated fields:
                    Genusspecies.Accession.Assemblyversion.Annotationversion.GeneID glyma.Wm82.gnm4.ann1.Glyma.01G022700
                </Text>
                <Text mb={6}>
                    Also note that the identifiers should be gene IDs rather than mRNAs these are typically
                    distinguished by a numeric suffix. That is: use gene Glyma.01G022700 rather than mRNA
                    Glyma.01G022700.1
                </Text>

                <Text fontSize={24} fontWeight={300} mb={4}>
                    2. Name and save the list.
                </Text>
                <Text mb={6}>
                    You can use the provided name if you wish (based on date and time), or you can give it a more
                    meaningful name. Then click the green “Save a list of 10 Genes” button. (Note that if you register
                    with GlycineMine you will be able to save your gene list so that you can use the same list over and
                    over again on the same tool or use that list on various GlycineMine tools.)
                </Text>

                <Text fontSize={24} fontWeight={300} mb={4}>
                    3. Examine the Gene Ontology Enrichment results.
                </Text>
                <Text mb={4}>
                    The report page will give descriptive information about each gene; and near the bottom of the page
                    are four reports: “Gene Ontology Enrichment”, “Gene Family Enrichment”, “Pathway Enrichment”, and
                    “Chromosome Distribution”.
                </Text>
                <Text mb={4}>
                    In the “Gene Ontology Enrichment” box, be sure to check each ontology aspect that you wich to
                    evaluate:
                </Text>
                <UnorderedList mb={4}>
                    <ListItem>biological_process</ListItem>
                    <ListItem>cellular_component</ListItem>
                    <ListItem>molecular_function</ListItem>
                </UnorderedList>
                <Text mb={8}>It is common for a set of genes to show enrichment for one aspect and not others.</Text>
                <Divider mb={6} />
                <ListCommon label="List 1" button="Results for List 1, showing `biological_process`" data={listOne} />
                <ListCommon label="List 2" button="Results for List 1, showing `cellular_component`" data={listTwo} />
                <ListCommon label="List 3" button="Results for List 1, showing `molecular_function`" data={listThree} />
            </Box>
        </BasicTemplate>
    );
};

export default GoEnrichmentBlog;

type ListCommonProps = {
    label: string;
    button: string;
    data: {
        data: string[];
        image: string;
    };
};
const ListCommon = ({ label, data, button }: ListCommonProps) => {
    return (
        <Box mb={8}>
            <Text fontSize={18} fontWeight={600} mb={6}>
                {label} :
            </Text>
            <VStack width="full" alignItems="start" mb={4}>
                {data?.data?.length > 0
                    ? data?.data?.map((item, index) => {
                          return <Text key={index}>{item}</Text>;
                      })
                    : null}
            </VStack>
            <Accordion allowMultiple>
                <AccordionItem>
                    <AccordionButton p={0} w="auto">
                        <Button
                            bg={colors.brand}
                            color="white"
                            px={4}
                            py={2}
                            w={500}
                            rightIcon={<AccordionIcon />}
                            variant="variants"
                        >
                            {button}
                        </Button>
                    </AccordionButton>

                    <AccordionPanel>
                        <Image src={data?.image} alt="image" w={400} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};
