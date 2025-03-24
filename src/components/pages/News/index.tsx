import { Box } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import Label from '../../atoms/Label';

const News = () => {
    return (
        <MainTemPlate>
            <Box py={4} px={4}>
                <Label label="What's New - Rice Genome Annotation Project" />
            </Box>
        </MainTemPlate>
    );
};

export default News;
