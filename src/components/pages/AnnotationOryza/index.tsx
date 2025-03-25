import { Box, Divider, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import Label from '../../atoms/Label';
import MainTemPlate from '../../templates/MainTemPlate';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';

const AnnotationOryza = () => {
    const handleDownload = () => {};
    return (
        <MainTemPlate>
            <VStack gap={2} w="full" p={4} alignItems="start">
                <Box w="full">
                    <Label label="Oryza Repeat Database" />
                </Box>
                <Text fontWeight={500} fontSize={14}>
                    Repeats in the rice genome
                </Text>
                <Text textAlign="justify">
                    The rice genome consists of repetitive DNA sequence intermixed with coding sequence. We have created
                    the Oryza Repeat Database to assist in the compilation and identification of repeat sequences in the
                    rice genome. All of the repetitive sequences in the database are coded for the convenience of future
                    analysis. The Oryza Repeat Database is a part of the Plant Repeat Databases.
                </Text>
                <Text fontWeight={500} fontSize={14} mb={'10px'}>
                    Curated, Annotated Oryza Repeat Database
                    <a
                        href="https://github.com/pachterlab/kallisto"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginLeft: '4px', color: colors.brand, textDecoration: 'underline' }}
                    >
                        background
                    </a>
                </Text>
                <Text fontWeight={500} fontSize={14} mb={'10px'}>
                    You can search the Oryza Repeat Database and the Gramineae Repeat Database{' '}
                    <Link to="" style={{ color: colors.brand, textDecoration: 'underline' }}>
                        here
                    </Link>
                </Text>
                <Text fontWeight={500} fontSize={14} mb={'10px'}>
                    Download the Oryza and Gramineae repeat sequences
                </Text>
                <UnorderedList>
                    <ListItem textDecoration="underline" color={colors.brand} onClick={() => handleDownload()}>
                        Oryza Repeat Database
                    </ListItem>
                    <ListItem textDecoration="underline" color={colors.brand} onClick={() => handleDownload()}>
                        Gramineae Repeat Database
                    </ListItem>
                </UnorderedList>
                <Divider borderColor={'#000'} />
                <Text fontWeight={500} fontSize={14} mb={'10px'}>
                    Citation:{' '}
                    <span style={{ fontWeight: 400 }}>
                        Researchers who wish to cite the Plant Repeat Databases are encouraged to refer to our
                        publication:
                    </span>
                </Text>
                <Text>
                    Ouyang S. and Buell C.R. The TIGR Plant Repeat Databases: a collective resource for the
                    identification of repetitive sequences in plants. Nucleic Acids Res. 2004 32(Database issue):D360-3.
                </Text>
            </VStack>
        </MainTemPlate>
    );
};

export default AnnotationOryza;
