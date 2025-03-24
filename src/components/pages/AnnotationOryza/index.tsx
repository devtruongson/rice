import { Box } from '@chakra-ui/react';
import Label from '../../atoms/Label';
import MainTemPlate from '../../templates/MainTemPlate';

const AnnotationOryza = () => {
    return (
        <MainTemPlate>
            <Box p={4}>
                <Label label="Oryza Repeat Database" />
            </Box>
        </MainTemPlate>
    );
};

export default AnnotationOryza;
