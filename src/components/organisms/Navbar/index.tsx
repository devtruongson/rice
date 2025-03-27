import { Box, Divider, Text } from '@chakra-ui/react';
import { HEADER_HEIGHT, NAVBAR_WIDTH } from '../../../constants';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';

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
                Tools
            </Text>
            <LabelCommon label="Analysis" />
            <ItemCustom label="GO Enrichment Analysis" path="/" />
            <ItemCustom label="Northern Uniform Soybean Trials (NUST)" path="/" />

            {/*  */}
            <LabelCommon label="Download / Query" />
            <ItemCustom label="Datastore" path="/" />
            <ItemCustom label="GlycineMine" path="/" />
            <ItemCustom label="Data Overviews for soy genomic data" path="/" />
            <ItemCustom label="USDA Germplasm SoySNP50K" path="/" />

            {/*  */}
            <LabelCommon label="Legacy tools" />
            <ItemCustom label="GRIN Data Explorer" path="/" />
            <ItemCustom label="Gene Expression Explorer" path="/" />

            {/*  */}
            <LabelCommon label="Search" />
            <ItemCustom label="Gene-name translator" path="/" />
            <ItemCustom label="Gene Search Tool" path="/" />
            <ItemCustom label="Trait Search Tool" path="/" />
            <ItemCustom label="SoyCyc" path="/" />

            {/*  */}
            <LabelCommon label="Sequence search" />
            <ItemCustom label="SoyBase SequenceServer BLAST" path="/" />
            <ItemCustom label="Annotate Your Sequences" path="/" />

            {/*  */}
            <LabelCommon label="Visualize / Browse" />
            <ItemCustom label="Genome browsers" path="/" />
            <ItemCustom label="Genome Context Viewer for Glycine" path="/" />
            <ItemCustom label="ZZBrowse GWAS/QTL" path="/" />
            <ItemCustom label="CMap-js: Genetic Map Viewer" path="/" />
            <ItemCustom label="LIS Germplasm GIS Viewer" path="/" />
            <ItemCustom label="Expression Resources" path="/" />
            <ItemCustom label="GCViT: SNP Comparison Tool" path="/" />
            <ItemCustom label="Ontology" path="/" />
            <ItemCustom label="Parentage" path="/" />
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
};
const ItemCustom = ({ label, path }: ItemCustomProps) => {
    return (
        <Link to={path}>
            <Text color={colors.green} fontWeight={400} mb={2}>
                {label}
            </Text>
        </Link>
    );
};
