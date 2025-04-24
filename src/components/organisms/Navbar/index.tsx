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
                Tools
            </Text>
            <LabelCommon label="Analysis" />
            <ItemCustom label="GO Enrichment Analysis" path={routesMap.Go} isBlank />
            {/* <ItemCustom label="Northern Uniform Soybean Trials (NUST)" path={routesMap.Nust} /> */}

            {/*  */}
            <LabelCommon label="Download / Query" />
            {/* <ItemCustom label="Datastore" path={routesMap.DataStore} /> */}
            <ItemCustom label="GlycineMine" path="https://mines.legumeinfo.org/glycinemine/begin.do" isBlank />
            <ItemCustom
                label="Data Overviews for soy genomic data"
                path="https://dscensor.legumeinfo.org/multiqc-demo/genome_main:Glycine"
                isBlank
            />
            <ItemCustom label="Dscensor Cassava" path={routesMap.DscensorSoybase} />
            <ItemCustom label="USDA Germplasm SoySNP50K" path={routesMap.GermplasmSoy} />

            {/*  */}
            <LabelCommon label="Legacy tools" />
            <ItemCustom label="GRIN Data Explorer" path="https://legacy.soybase.org/grindata/" isBlank />
            <ItemCustom label="Gene Expression Explorer" path="https://legacy.soybase.org/experiments/" isBlank />

            {/*  */}
            <LabelCommon label="Search" />
            {/* <ItemCustom label="Gene-name translator" path={routesMap.GeneTranslation} /> */}
            <ItemCustom label="Gene Search Tool" path={routesMap.Search} />
            <ItemCustom label="Trait Search Tool" path={routesMap.TrainSearch} />
            {/* <ItemCustom label="SoyCyc" path="/" /> */}

            {/*  */}
            <LabelCommon label="Sequence search" />
            <ItemCustom label="Cassava SequenceServer BLAST" path="/" />
            <ItemCustom label="Annotate Your Sequences" path="/" />

            {/*  */}
            {/* <LabelCommon label="Visualize / Browse" />
            <ItemCustom label="Genome browsers" path="/" />
            <ItemCustom label="Genome Context Viewer for Glycine" path="/" />
            <ItemCustom label="ZZBrowse GWAS/QTL" path="/" />
            <ItemCustom label="CMap-js: Genetic Map Viewer" path="/" />
            <ItemCustom label="LIS Germplasm GIS Viewer" path="/" />
            <ItemCustom label="Expression Resources" path="/" />
            <ItemCustom label="GCViT: SNP Comparison Tool" path="/" />
            <ItemCustom label="Ontology" path="/" />
            <ItemCustom label="Parentage" path="/" /> */}
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
