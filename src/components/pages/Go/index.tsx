import { Box, FormControl, Text, Textarea, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import LinkCustom from '../../atoms/Link';
import ButtonCustom from '../../atoms/Button';

const Go = () => {
    return (
        <MainTemPlate>
            <Box>
                <Text mb={4}>
                    GO enrichment analysis uses statistical tests to determine if a set of provided genes are
                    statistically different than a comparison set (typically, the set of all genes in the organism), for
                    to each of the three main gene ontology "aspects": Molecular Function, Cellular Component, and
                    Biological Process.
                </Text>
                <Text mb={4}>
                    SoyBase offers two methods for calculating GO enrichment: the service at this page; and the
                    gene-list report at
                    <LinkCustom
                        ml={1}
                        content="GlycineMine"
                        path="https://mines.legumeinfo.org/glycinemine/begin.do"
                        isBlank
                        as={'span'}
                    />
                    .
                </Text>
                <Text mb={4}>
                    See <LinkCustom content="this blog post" path="/" fontWeight={500} as={'span'} /> for details about
                    doing GO enrichment analysis at GlycineMine. One advantage of using the{' '}
                    <LinkCustom content="GlycineMine" path="/" as={'span'} /> tool is that enrichment can be calculated
                    for genes from ANY Glycine accession and annotation in the system, rather than for Wm82.a4.v1 that
                    is offered on the service on this page. GlycineMine also reports several other analyses, including
                    enrichments for gene families, pathways, and chromosomal location.
                </Text>
                <Text mb={4}>GO term enrichment analysis using Wm82.a4.v1 gene model names.</Text>
                <Text mb={4}>
                    The underlying algorithms for this tool come from{' '}
                    <LinkCustom
                        ml={1}
                        content="Morales et al. (2013)"
                        path="https://dx.doi.org/10.1071/FP12296"
                        isBlank
                        as={'span'}
                    />
                </Text>
                <Text mb={10}>Either enter a list of gene model names into this box, one name per line:</Text>

                <Box border="1px solid black" p={4} width="350px" position="relative">
                    <Box
                        position="absolute"
                        top="-10px"
                        left="12px"
                        bg="white"
                        px="2"
                        fontSize="sm"
                        fontWeight="bold"
                        whiteSpace="nowrap"
                    >
                        Insert Gene List: (One per line)
                    </Box>

                    <FormControl>
                        <Textarea placeholder="Glyma.09G044100..." mt={3} minHeight={80} />

                        <VStack spacing={2} mt={4}>
                            <ButtonCustom text="GO ANNOTATION" action={() => {}} width="100%" />
                            <ButtonCustom text="GO TERM ENRICHMENT ANALYSIS" action={() => {}} width="100%" />
                        </VStack>
                    </FormControl>
                </Box>
            </Box>
        </MainTemPlate>
    );
};

export default Go;
