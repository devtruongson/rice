import { Box, FormControl, Text, Textarea, VStack } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import LinkCustom from '../../atoms/Link';
import ButtonCustom from '../../atoms/Button';
import { useEffect, useState } from 'react';
import { useGetListGene } from '../../../services/gene/get-list';

const Go = () => {
    const [isEnable, setIsEnable] = useState(false);
    const [list, setList] = useState<string>('');

    // Lấy danh sách gene 
    const { data } = useGetListGene({ names: list, enabled: isEnable && Boolean(list) });

    const handleDowload = () => {
        setIsEnable(true);
    };

    // Xử lý tải xuống file 
    useEffect(() => {
        if (data?.data?.length && isEnable) {
            let textContent = '`Gene Model\tArabidopsis hit\tGO terms\n';
            data.data.forEach((item) => {
                const geneModel = item?.name;
                const arabidopsisHit = item?.arabidopsis_hit;
                const goTerms = item?.go_terms.join('\t');
                textContent += `${geneModel}\t${arabidopsisHit}\t${goTerms}\n`;
            });
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'gene_model_data.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsEnable(false);
        }
    }, [data, isEnable]);

    return (
        <MainTemPlate>
            <Box>
                <Text mb={4}>
                    Phân tích làm giàu GO sử dụng các thử nghiệm thống kê để xác định xem một tập hợp các gen được cung
                    cấp có khác biệt về mặt thống kê so với một tập hợp so sánh (thường là tập hợp tất cả các gen trong
                    sinh vật) hay không, đối với từng "khía cạnh" chính của thuật ngữ gen: Chức năng phân tử, Thành phần
                    tế bào và Quy trình sinh học.
                </Text>
                <Text mb={4}>
                    Sắn cung cấp hai phương pháp để tính toán sự làm giàu GO: dịch vụ tại trang này; và báo cáo danh
                    sách gen tại
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
                    Xem <LinkCustom content="bài đăng trên blog này" path="/" fontWeight={500} as={'span'} /> để biết
                    chi tiết về việc thực hiện phân tích làm giàu GO tại GlycineMine. Một lợi thế của việc sử dụng{' '}
                    <LinkCustom content="GlycineMine" path="/" as={'span'} /> công cụ là có thể tính toán được sự làm
                    giàu cho các gen từ BẤT KỲ sự gia nhập và chú thích Glycine nào trong hệ thống, thay vì cho
                    Wm82.a4.v1 được cung cấp trên dịch vụ trên trang này. GlycineMine cũng báo cáo một số phân tích
                    khác, bao gồm sự làm giàu cho các họ gen, con đường và vị trí nhiễm sắc thể.
                </Text>
                <Text mb={4}>Phân tích làm giàu thuật ngữ GO bằng cách sử dụng tên mô hình gen Wm82.a4.v1.</Text>
                <Text mb={4}>
                    Các thuật toán cơ bản cho công cụ này đến từ{' '}
                    <LinkCustom
                        ml={1}
                        content="Morales và cộng sự. (2013)"
                        path="https://dx.doi.org/10.1071/FP12296"
                        isBlank
                        as={'span'}
                    />
                </Text>
                <Text mb={10}>Hoặc nhập danh sách tên mô hình gen vào hộp này, mỗi tên một dòng:</Text>

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
                        Chèn danh sách gen: (Mỗi dòng một gen)
                    </Box>

                    <FormControl>
                        <Textarea
                            placeholder="Glyma.09G044100..."
                            mt={3}
                            minHeight={80}
                            onChange={(e) => setList(e.target.value)}
                        />

                        <VStack spacing={2} mt={4}>
                            <ButtonCustom text="GO ANNOTATION" action={() => handleDowload()} width="100%" />
                            {/* <ButtonCustom text="GO TERM ENRICHMENT ANALYSIS" action={() => {}} width="100%" /> */}
                        </VStack>
                    </FormControl>
                </Box>
            </Box>
        </MainTemPlate>
    );
};

export default Go;
