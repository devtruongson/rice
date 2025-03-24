import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Box>
            <Flex justify="center" gap={4}>
                <Image src="https://rice.uga.edu/images/nsf1.gif" alt="NSF Logo" objectFit={'contain'} />
                <Image
                    src="https://rice.uga.edu/images/UGA_logo.png"
                    alt="University of Georgia Logo"
                    objectFit={'contain'}
                />
                <Image
                    src="https://rice.uga.edu/images/GRA_logo.png"
                    alt="Georgia Research Alliance Logo"
                    objectFit={'contain'}
                />
            </Flex>
            <Text mt={4} px={4} fontSize="sm" textAlign="center">
                This work is supported by grants (DBI-0321538/DBI-0834043) from the National Science Foundation and
                funds from the Georgia Research Alliance, Georgia Seed Development, and University of Georgia.
            </Text>
            <Text mt={4} textAlign="center" fontWeight="bold" bg="teal.500" color="white" py={2}>
                Comments or Questions? Send e-mail to{' '}
                <Link to="mailto:ricegenome@uga.edu" color="red.500">
                    Rice Genome Annotation Project Team at UGA
                </Link>
            </Text>
        </Box>
    );
};

export default Footer;
