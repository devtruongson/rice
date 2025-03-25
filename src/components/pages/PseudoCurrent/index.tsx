import { Box, Divider, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import Label from '../../atoms/Label';
import { routesMap } from '../../../routes/routes';
import LinkCustom from '../../atoms/Link';
import LinkBlank from '../../atoms/Link/LinkBlank';

const PseudoCurrent = () => {
    return (
        <MainTemPlate>
            <Box p={4} textAlign="justify">
                <Label label="Current Rice Genome Pseudomolecules Release" mb={2} />
                <Text fontWeight={500} mb={2}>
                    We are pleased to announce release 7 of the Rice Pseudomolecules and Genome Annotation. The official
                    release date for this version was October 31, 2011.
                </Text>
                <Text mb={2}>
                    Release 7 is a major update from release 6.1. The rice pseudomolecules have been reconstructed using
                    an optimal BAC tiling path that involved use of a BAC-optical map and error correction of the
                    underlying BAC sequence using next generation sequencing reads from Nipponbare rice. This effort, in
                    cooperation with researchers at the Agrogenomics Research Center at the National Institute of
                    Agrobiological Sciences, Tsukuba, Japan and the{' '}
                    <LinkBlank
                        href="https://rapdb.dna.affrc.go.jp/"
                        title="Rice Annotation Project Database (RAP-DB)"
                    />
                    , represents a final and unified set of pseudomolecules (Os-Nipponbare-Reference-IRGSP-1.0). There
                    are the 12 chromosomes, one pseudomolecule representing the unanchored BAC clones, one
                    pseudomolecule representing unmapped Syngenta sequences plus the two organellar genomes. Note that
                    while the Rice Genome Annotation Project (RGAP) and the International Rice Annotation Project
                    Database (RAP-DB) have different annotation efforts, these parallel annotation efforts utilize the
                    same underlying pseudomolecule sequence.
                </Text>
                <Text mb={2}>
                    In release 7, there were 373,245,519 bp of non-overlapping rice genome sequence from the 12 rice
                    chromosomes. The genes that had been identified from release 6.1 were remapped and transfered to
                    release 7. This process resulted in 55,986 genes (loci) had been identified, of which 6,457 had
                    10,352 additional alternative splicing isoforms resulting in a total of 66,338 transcripts (or gene
                    models) in the rice genome. Note that small gene models (50 amino acids) have been excluded from our
                    annotated gene set.
                </Text>
                <Text mb={2}>
                    Transposable element-related (TE-related) gene models were identified using two approaches: BLASTN
                    searches against the{' '}
                    <LinkCustom href={routesMap.AnnotationOryza} title="MSU Oryza Repeat Database" /> and by identifying
                    gene models containing TE-related Pfam domains. These loci (16,941) and their models (17,272) were
                    annotated based on the Pfam domain or the nomenclature in the MSU Oryza Repeat Database. Pack-MULEs
                    were identified on all 12 chromosomes. They were annotated as described in{' '}
                    <LinkBlank
                        href="https://academic.oup.com/plcell/article-abstract/21/1/25/6095896?redirectedFrom=fulltext"
                        title="Hanada et al. 2009."
                    />
                    Transduplicate MULEs identified by{' '}
                    <LinkBlank
                        href="https://www.google.com/search?q=Juretic+et+al.+2005&rlz=1C1CHBF_enVN1024VN1024&sourceid=chrome&ie=UTF-8"
                        title="Juretic et al. 2005"
                    />{' '}
                    were aligned to the current pseudomolecules. Note that the Jiang Pack-MULEs and the transduplicate
                    MULEs had only been identified on the Genome Browser and not in our functional annotation. Also note
                    that although loci and gene models on ChrUn and ChrSy are now included in our official gene set but
                    are not assigned LOC_OsXXgXXXXX identifiers. These two pseudomolecules contain 185 loci and gene
                    models.
                </Text>
                <Text textAlign="center" mb={2}>
                    Please note that these pseudomolecules are constructed from finished and unfinished sequence and a
                    majority of the gene models have not been manually curated.
                </Text>
                <Divider borderColor={'#000'} mb={4} />

                {/* TODO get data */}
                <Box mb={4}>get data .........</Box>

                <UnorderedList>
                    <ListItem>{'a Excluding small gene models (< 50 amino acids).'}</ListItem>
                    <ListItem>
                        b TE: Transposable elements related genes and gene models. The rice proteome was searched
                        against
                        <LinkCustom href={routesMap.AnnotationOryza} title=" MSU Oryza Repeat Database" /> with TBLASTN
                        and against the TE-related Pfam domains with hmmpfam. Genes and gene models with matches above
                        cut-offs were annotated as TE-related gene models.
                    </ListItem>
                    <ListItem>c Non-TE: Non-TE related gene models.</ListItem>
                    <ListItem>
                        d There are 89 loci and 89 models on ChrSy. There are 96 loci and 96 models on ChrUn. These loci
                        and models are not included in the totals for the main pseudomolecules.
                    </ListItem>
                    <ListItem>
                        e Note that these pseudomolecules are now identical to the{' '}
                        <LinkBlank
                            href="https://academic.oup.com/plcell/article-abstract/21/1/25/6095896?redirectedFrom=fulltext"
                            title="IRGSP/RAP"
                        />
                        pseudomolecules.
                    </ListItem>
                </UnorderedList>
            </Box>
        </MainTemPlate>
    );
};

export default PseudoCurrent;
