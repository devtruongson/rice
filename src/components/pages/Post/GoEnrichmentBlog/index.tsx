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
                    Đăng bởi {blogsDefault?.author} on {formatDate(blogsDefault?.createdAt)}
                </Text>
                <Text fontSize={24} fontWeight={300} mb={4}>
                    {blogsDefault?.description}
                </Text>
                <Text mb={4}>
                    <Text as={'span'} fontWeight={600}>
                        Phân tích làm giàu GO
                    </Text>{' '}
                    sử dụng các thử nghiệm thống kê để xác định xem một tập hợp các gen được cung cấp có khác biệt về
                    mặt thống kê so với một tập hợp so sánh (thường là tập hợp tất cả các gen trong sinh vật) hay không,
                    đối với mỗi một trong ba khía cạnh chính của thuật ngữ học gen.
                </Text>
                <Text mb={4}>
                    <LinkCustom
                        content="Bản thể học gen (GO)"
                        path="https://geneontology.org/docs/ontology-documentation/"
                        isBlank
                        as="span"
                    />{' '}
                    là một hệ thống phân loại mô tả ba khía cạnh của chức năng gen:
                </Text>
                <UnorderedList mb={3}>
                    <ListItem>
                        Chức năng phân tử, mô tả các hoạt động như hoạt động xúc tác hoặc các hoạt động ở quy mô nhỏ hơn
                        như hoạt động của lipoprotein lipase;
                    </ListItem>
                    <ListItem>
                        Thành phần tế bào, mô tả các thành phần tế bào như bộ khung tế bào, hoặc các vị trí ở quy mô nhỏ
                        hơn như trung thể;
                    </ListItem>
                    <ListItem>
                        Quá trình sinh học, mô tả các chương trình sinh học như truyền tín hiệu hoặc các quá trình ở quy
                        mô nhỏ hơn như hoạt động của protein serine/threonine kinase.
                    </ListItem>
                </UnorderedList>
                <Text mb={6}>{personalBrand} cung cấp hai phương pháp để tính toán mức độ làm giàu GO.</Text>
                <Text fontSize={36} fontWeight={300} mb={4}>
                    1. Sử dụng dịch vụ tùy chỉnh tại trang công cụ Cassava{' '}
                </Text>
                <Text mb={6}>
                    {
                        'Trang <a href=”/tools/analysis/go.html target=”_blank>tools/analysis/go.html</a> cung cấp các dịch vụ để chú thích danh sách gen của bạn với các bản ghi GO và để tính toán sự làm giàu GO, sử dụng phương pháp được mô tả trong Morales et al. (2013). ID gen cần phải từ tập hợp và chú thích Wm82.a4.v1 (hay còn gọi là Wm82.gnm4.ann1). Hãy thử các định danh mẫu được cung cấp tại trang để xem kết quả.'
                    }
                </Text>
                <Text fontSize={36} fontWeight={300} mb={4}>
                    2. Sử dụng công cụ làm giàu GO tại GlycineMine.
                </Text>
                <Text mb={6}>
                    Tại GlycineMine, có thể tính toán sự làm giàu cho các gen từ BẤT KỲ nguồn gốc Glycine nào và chú
                    thích trong GlycineMine (có hơn 50 bộ chú thích tính đến giữa năm 2024).
                    <br />
                    Sau đây là các bước thực hiện:{' '}
                </Text>

                <Text fontSize={24} fontWeight={300} mb={4}>
                    1. Nhập danh sách gen vào mục Phân tích danh sách.
                </Text>
                <Text mb={4}>
                    Mở GlycineMine và dán danh sách gen vào hộp trung tâm (“Phân tích danh sách”). Danh sách có thể bao
                    gồm các ID gen không có tiền tố như Glyma.01G022700, nhưng nếu gen đó tồn tại trong nhiều bộ lắp ráp
                    hoặc bộ chú thích, bạn sẽ thấy một trang trung gian trong đó bạn sẽ được yêu cầu chọn gen nào bạn
                    muốn phân tích. Do đó, nói chung, tốt nhất là thêm tiền tố cho các mã định danh của bạn bằng bốn
                    trường sau, được phân tách bằng dấu chấm:
                    Genusspecies.Accession.Assemblyversion.Annotationversion.GeneID glyma.Wm82.gnm4.ann1.Glyma.01G022700
                </Text>
                <Text mb={6}>
                    Ngoài ra, lưu ý rằng các định danh phải là ID gen chứ không phải mRNA, chúng thường được phân biệt
                    bằng hậu tố số. Nghĩa là: sử dụng gen Glyma.01G022700 thay vì mRNA Glyma.01G022700.1
                </Text>

                <Text fontSize={24} fontWeight={300} mb={4}>
                    2. Đặt tên và lưu danh sách.{' '}
                </Text>
                <Text mb={6}>
                    Bạn có thể sử dụng tên được cung cấp nếu muốn (dựa trên ngày và giờ), hoặc bạn có thể đặt cho nó một
                    tên có ý nghĩa hơn. Sau đó, nhấp vào nút màu xanh lá cây "Lưu danh sách 10 gen". (Lưu ý rằng nếu bạn
                    đăng ký với GlycineMine, bạn sẽ có thể lưu danh sách gen của mình để có thể sử dụng cùng một danh
                    sách nhiều lần trên cùng một công cụ hoặc sử dụng danh sách đó trên nhiều công cụ GlycineMine khác
                    nhau.)
                </Text>

                <Text fontSize={24} fontWeight={300} mb={4}>
                    3. Kiểm tra kết quả làm giàu Gene Ontology.{' '}
                </Text>
                <Text mb={4}>
                    Trang báo cáo sẽ cung cấp thông tin mô tả về từng gen; và gần cuối trang là bốn báo cáo: “Làm giàu
                    bản thể gen”, “Làm giàu họ gen”, “Làm giàu đường dẫn” và “Phân phối nhiễm sắc thể”.
                </Text>
                <Text mb={4}>
                    Trong hộp “Làm giàu bản thể học gen”, hãy đảm bảo kiểm tra từng khía cạnh bản thể học mà bạn muốn
                    đánh giá:
                </Text>
                <UnorderedList mb={4}>
                    <ListItem>quá trình sinh học</ListItem>
                    <ListItem>thành phần di động</ListItem>
                    <ListItem>chức năng phân tử</ListItem>
                </UnorderedList>
                <Text mb={8}>
                    Thông thường, một tập hợp gen sẽ biểu hiện sự phong phú ở một khía cạnh này nhưng không biểu hiện ở
                    những khía cạnh khác.
                </Text>
                <Divider mb={6} />
                <ListCommon
                    label="Danh sách 1"
                    button="Kết quả cho Danh sách 1, hiển thị `biological_process`"
                    data={listOne}
                />
                <ListCommon
                    label="Danh sách 2"
                    button="Kết quả cho Danh sách 1, hiển thị `cellular_component`"
                    data={listTwo}
                />
                <ListCommon
                    label="Danh sách 3"
                    button="Kết quả cho Danh sách 1, hiển thị `molecular_function`"
                    data={listThree}
                />
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
