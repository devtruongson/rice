import { Box } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import Label from '../../atoms/Label';

const FAQ = () => {
    return (
        <MainTemPlate>
            <Box p={4}>
                <Label label="Frequently Asked Questions about the Rice Genome Annotation Project Resource" />
            </Box>
        </MainTemPlate>
    );
};

export default FAQ;
