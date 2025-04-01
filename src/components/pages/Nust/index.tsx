import { Box, Flex, Text } from '@chakra-ui/react';
import BasicTemplate from '../../templates/BasicTemplate';
import colors from '../../../constants/colors';

const Nust = () => {
    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <BasicTemplate>
            <Box>
                <Flex justifyContent="center">
                    <Flex bg={colors.brand} gap={20} mb={10}>
                        {[
                            { label: 'General Phenotype Search Tool', id: 'box_one' },
                            { label: 'Strain Search Tool', id: 'box_two' },
                            { label: 'Specific Strain Phenotype Search Tool', id: 'box_three' },
                            { label: 'Common Test Tool', id: 'box_four' },
                        ].map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    px={4}
                                    py={2}
                                    textTransform="uppercase"
                                    color="white"
                                    cursor="pointer"
                                    _hover={{ opacity: 0.6 }}
                                    onClick={() => handleScroll(item.id)}
                                >
                                    {item.label}
                                </Box>
                            );
                        })}
                    </Flex>
                </Flex>

                {/* one */}
                <FormCommon
                    label="General Phenotype Search Tool"
                    subLabel="This tool allows you to retrieve some or all phenotypic values for all or some strains from a given year(s) and test(s). You can limit your query to a given location, strain or phenotype."
                    id="box_one"
                >
                    <Box>one</Box>
                </FormCommon>

                {/* two */}
                <FormCommon
                    label="Strain Search Tool"
                    subLabel="This tool allows you to retrieve some or all phenotypic values for all or some strains from a given year(s) and test(s). You can limit your query to a given location, strain or phenotype."
                    id="box_two"
                >
                    <Box>one</Box>
                </FormCommon>

                {/* three */}
                <FormCommon
                    label="Specific Strain Phenotype Search Tools"
                    subLabel="This tool allows you to retrieve phenotypic data for a list of strains. The query can be limited by year, test, location and/or phenotype."
                    id="box_three"
                >
                    <Box>one</Box>
                </FormCommon>

                {/* four */}
                <FormCommon
                    label="Common Test Tool"
                    subLabel="This tool allows you to enter strain names and retrieve all the common years and tests in which those strains were tested."
                    id="box_four"
                >
                    <Box>one</Box>
                </FormCommon>
            </Box>
        </BasicTemplate>
    );
};

export default Nust;

type FormCommonProps = { label: string; subLabel: string; id: string; children: React.ReactNode };
const FormCommon = ({ label, subLabel, id, children }: FormCommonProps) => {
    return (
        <Box id={id}>
            <Text fontWeight={500} fontSize={24}>
                {label}
            </Text>
            <Text fontStyle="italic">{subLabel}</Text>
            {children}
        </Box>
    );
};
