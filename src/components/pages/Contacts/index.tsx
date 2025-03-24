import { Box, Divider, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import colors from '../../../constants/colors';

const Contacts = () => {
    return (
        <MainTemPlate>
            <Box py={4} px={4}>
                <Text textAlign="center" fontSize={20} fontWeight={500}>
                    Contact the Rice Genome Annotation Project Team
                </Text>

                <Text fontWeight={500} fontSize={14}>
                    Comments
                </Text>
                <Text mb={6}>
                    We welcome comments from the community on the Rice Genome Annotation Project. If you have questions
                    on the project/web pages and/or suggestions about how to better convey our data to the community,
                    please provide your feedback to the project email: buell.lab.web@gmail.com
                </Text>
                <Divider borderColor={'#000'} />

                <Text fontWeight={500} fontSize={14}>
                    Contacts
                </Text>
                <UnorderedList mb={10}>
                    <ListItem>
                        C. Robin Buell, Principal Investigator, University of Georgia -
                        <a
                            href="https://buell-lab.github.io/"
                            target="_blank"
                            style={{ color: colors.brand, marginLeft: '4px', textDecoration: 'underline' }}
                        >
                            Buell Lab Website
                        </a>
                    </ListItem>
                    <ListItem>UGA Rice Genome Annotation Project Team: buell.lab.web@gmail.com</ListItem>
                </UnorderedList>
            </Box>
        </MainTemPlate>
    );
};

export default Contacts;
