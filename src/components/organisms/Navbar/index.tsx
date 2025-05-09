import { Box, Divider, Text } from '@chakra-ui/react';
import { HEADER_HEIGHT, NAVBAR_WIDTH } from '../../../constants';
import colors from '../../../constants/colors';
import { routesMap } from '../../../routes/routes';
import LinkCustom from '../../atoms/Link';

const Navbar = () => {
    return (
        <Box
            width={NAVBAR_WIDTH}
            h={`calc(100vh - ${HEADER_HEIGHT}px)`}
            overflowY="auto"
            p={45}
            position="fixed"
            left={0}
            bottom={0}
            top={HEADER_HEIGHT}
        >
            <Text mb={4} fontSize={20}>
                Công cụ
            </Text>
            <LabelCommon label="Phân tích" />
            <ItemCustom label="Phân tích làm giàu GO" path={routesMap.Go} isBlank />

            {/*  */}
            <LabelCommon label="Tải xuống / Truy vấn" />
            <ItemCustom label="GlycineMine" path="https://mines.legumeinfo.org/glycinemine/begin.do" isBlank />
            <ItemCustom
                label="Tổng quan dữ liệu cho dữ liệu bộ gen cây sắn"
                path="https://dscensor.legumeinfo.org/multiqc-demo/genome_main:Glycine"
                isBlank
            />
            <ItemCustom label="Sắn Dscensor" path={routesMap.DscensorSoybase} />
            <ItemCustom label="USDA Germplasm SoySNP50K" path={routesMap.GermplasmSoy} />

            {/*  */}
            <LabelCommon label="Công cụ kế thừa" />
            <ItemCustom label="Trình khám phá dữ liệu GRIN" path="https://legacy.soybase.org/grindata/" isBlank />
            <ItemCustom label="Trình khám phá biểu hiện gen" path="https://legacy.soybase.org/experiments/" isBlank />

            {/*  */}
            <LabelCommon label="Tìm kiếm" />
            <ItemCustom label="Công cụ tìm kiếm gen" path={routesMap.Search} />
            <ItemCustom label="Công cụ tìm kiếm đặc điểm" path={routesMap.TrainSearch} />

            {/*  */}
            <LabelCommon label="Tìm kiếm theo trình tự" />
            <ItemCustom label="Máy chủ BLAST của Cassava Sequence" path="/" />
            <ItemCustom label="Chú thích chuỗi của bạn" path="/" />
        </Box>
    );
};

export default Navbar;

type LabelCommonProps = {
    label: string;
};
const LabelCommon = ({ label }: LabelCommonProps) => {
    return (
        <>
            <Text textTransform="uppercase" mb={2} mt={6}>
                {label}
            </Text>
            <Divider mb={2} />
        </>
    );
};

type ItemCustomProps = {
    label: string;
    path: string;
    isBlank?: boolean;
};
const ItemCustom = ({ label, path, isBlank = false }: ItemCustomProps) => {
    return <LinkCustom content={label} path={path} color={colors.green} fontWeight={400} mb={2} isBlank={isBlank} />;
};
