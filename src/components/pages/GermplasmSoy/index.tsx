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
                    Một Illumina Infinium BeadChip chứa hơn 50.000 SNP từ đậu nành (Glycine max L. Merr.) đã được phát
                    triển{' '}
                    <LinkCustom
                        content="(Song và cộng sự 2013; Song và cộng sự 2015)"
                        path="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054985"
                        isBlank
                        as={'span'}
                    />
                    . Tổng cộng 498.921.777 lần đọc dài 35-45 bp đã thu được từ phân tích trình tự DNA của các thư viện
                    biểu diễn giảm từ một số mẫu đậu nành bao gồm sáu kiểu gen đậu nành trồng trọt và hai kiểu gen đậu
                    nành hoang dã (G. soja Sieb. et Zucc.). Các lần đọc này đã được ánh xạ tới{' '}
                    <LinkCustom content="Wm82.a1 sắn trình tự toàn bộ bộ gen" path="/" as={'span'} mr={2} />
                    (
                    <LinkCustom
                        content="Gemome Browser"
                        path="https://www.soybase.org/assets/js/jbrowse/?session=local-mkYQyXQcu8VV8xbKTxUx5"
                        isBlank
                        mx={1}
                        as={'span'}
                    />
                    ) và 209.903 SNP đã được xác định. Sau khi áp dụng một số bộ lọc, tổng cộng 146.161 SNP đã được xác
                    định là ứng cử viên cho thiết kế Illumina Infinium II BeadChip. Để cân bằng khoảng cách giữa các SNP
                    đã chọn, tăng tỷ lệ thành công của xét nghiệm và giảm thiểu số lượng SNP có tần số alen nhỏ thấp,
                    một thuật toán lặp lại dựa trên chỉ số lựa chọn đã được phát triển và sử dụng để lựa chọn 60.800 SNP
                    cho thiết kế Infinium BeadChip. Trong số 60.800 SNP, 50.701 nhắm mục tiêu đến các vùng euchromatic
                    và 10.000 đến các vùng heterochromatic của 20 nhiễm sắc thể đậu nành. Ngoài ra, 99 SNP nhắm mục tiêu
                    đến các khung trình tự không neo. Trong số 60.800 SNP, tổng cộng 52.041 đã vượt qua giai đoạn sản
                    xuất của Illumina để sản xuất SoySNP50K iSelect BeadChip.
                </Text>

                <Text fontWeight={300} fontSize={28} mb={8}>
                    Xem SNP SoySNP50K trong Trình duyệt bộ gen sắn
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
