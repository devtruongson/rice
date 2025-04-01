import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import LinkCustom from '../../atoms/Link';
import TableCusTom from '../../molecules/Table';
import colors from '../../../constants/colors';

const GermplasmSoy = () => {
    return (
        <MainTemPlate>
            <Box>
                <Text fontWeight={300} fontSize={38} mb={6}>
                    SoySNP50K iSelect BeadChip
                </Text>
                <Text mb={8}>
                    An Illumina Infinium BeadChip containing over 50,000 SNPs from soybean (Glycine max L. Merr.) has
                    been developed{' '}
                    <LinkCustom
                        content="(Song et al. 2013; Song et al. 2015)"
                        path="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054985"
                        isBlank
                        as={'span'}
                    />
                    . A total of 498,921,777 reads 35-45 bp in length were obtained from DNA sequence analysis of
                    reduced representation libraries from several soybean accessions which included six cultivated and
                    two wild soybean (G. soja Sieb. et Zucc.) genotypes. These reads were mapped to the{' '}
                    <LinkCustom
                        content="Wm82.a1 soybean
                    whole genome sequence"
                        path="/"
                        as={'span'}
                        mr={2}
                    />
                    (
                    <LinkCustom
                        content="Gemome Browser"
                        path="https://www.soybase.org/assets/js/jbrowse/?session=local-mkYQyXQcu8VV8xbKTxUx5"
                        isBlank
                        mx={1}
                        as={'span'}
                    />
                    ) and 209,903 SNPs were identified. After applying several filters, a total of 146,161 SNPs were
                    determined to be candidates for Illumina Infinium II BeadChip design. To equalize the distance
                    between selected SNPs, increase assay success rate, and minimize the number of SNPs with low minor
                    allele frequency, an iteration algorithm based on a selection index was developed and used to select
                    60,800 SNPs for Infinium BeadChip design. Of the 60,800 SNPs, 50,701 were targeted to euchromatic
                    regions and 10,000 to heterochromatic regions of the 20 soybean chromosomes. In addition, 99 SNPs
                    were targeted to unanchored sequence scaffolds. Of the 60,800 SNPs, a total of 52,041 passed
                    Illumina's manufacturing phase to produce the SoySNP50K iSelect BeadChip.
                </Text>

                <Text fontWeight={300} fontSize={28} mb={8}>
                    View SoySNP50K SNPs in SoyBase Genome Browser
                </Text>
                <TableCusTom
                    columns={[
                        { key: 'a', label: 'AAA', w: '20%' },
                        { key: 'b', label: 'BBB', w: '' },
                    ]}
                    data={[
                        { a: '1', b: '2' },
                        { a: '3', b: '4' },
                    ]}
                    mb={8}
                />
                <VStack w="full" gap={4} alignItems="start" mb={10}>
                    <Text fontWeight={300} fontSize={28}>
                        Download SNP Data
                    </Text>
                    <Text>
                        The SoySNP50K iSelect BeadChip has been used to genotype the{' '}
                        <LinkCustom
                            content="USDA Soybean Germplasm Collection"
                            path="https://www.ars.usda.gov/midwest-area/urbana-il/soybeanmaize-germplasm-pathology-and-genetics-research/"
                            isBlank
                            as={'span'}
                            mr={2}
                        />
                        (
                        <LinkCustom
                            as={'span'}
                            mx={1}
                            content="Song, Qijian, David L. Hyten, Gaofeng Jia, Charles V. Quigley, Edward W. Fickus, Randall L. Nelson, and Perry B. Cregan. 2015. Fingerprinting soybean germplasm and its utility in genomic research, G3: Genes| Genomes| Genetics 50(10):1999-2006."
                            path="https://academic.oup.com/g3journal/article/5/10/1999/6028905"
                        />
                        )
                    </Text>
                    <Text>
                        SoySNP50K SNP positional information in relationship to the Wm82.a2 and Wm82.a1 assemblies can
                        be found in Construction of high resolution genetic linkage maps to improve the soybean genome
                        sequence assembly Glyma1.01, Song et al. 2016 BMC Genomics 17:33 in Supplemental table S1.
                    </Text>
                    <Text>
                        A subset of the SoySNP50K dataset was produced by Song et al. called the BARCSoySNP6K SNP set
                        described in Soybean BARCSoySNP6K: An assay for soybean genetics and breeding research, Plant
                        Journal (2020) 104(3):800-811 . The SNP set assembled can be found in Supplemental Table S1.
                    </Text>
                </VStack>

                <Text fontWeight={300} fontSize={28} mb={6}>
                    Bulk Downloads
                </Text>
                <Text mb={6}>
                    The complete data set for 20,087 G. max and G. soja accessions genotyped with 42,509 SNPs is
                    available for Wm82.a1 and Wm82.a2 in either vcf or HapMap format. You can extract a large list of
                    cultivars using BCFtools and a VCF file chosen below.
                </Text>
                <HStack bg={colors.brand} w="360px" justifyContent="center" py={2}>
                    <Text color="white" fontWeight={600} fontSize={20}>
                        SNP50K Downloads
                    </Text>
                </HStack>
            </Box>
        </MainTemPlate>
    );
};

export default GermplasmSoy;
