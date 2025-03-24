import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';

const HomeOverview = () => {
    return (
        <MainTemPlate>
            <Box mx="auto" p={6} bg="gray.100" borderRadius="lg" boxShadow="lg">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
                    Rice Genome Annotation Project Overview
                </Text>
                <Text>
                    Rice is a model species for the monocotyledonous plants and the cereals which are the greatest
                    source of food for the world's population. While rice genome sequence is available through multiple
                    sequencing projects, high quality, uniform annotation is required in order for genome sequence data
                    to be fully utilized by researchers.
                </Text>
                <Text mt={4}>
                    The objective of this project has always been to provide high quality annotation for the rice
                    genome. We generated, refined and updated gene models for the estimated 40,000-60,000 total rice
                    genes.
                </Text>
                <Text mt={4}>
                    This project is funded by the National Science Foundation Plant Genome Research Program #
                    DBI-0321538 and DBI-0834043.
                </Text>
                {/* <Divider my={4} /> */}
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
                <Text mt={4} fontSize="sm" textAlign="center">
                    This work is supported by grants (DBI-0321538/DBI-0834043) from the National Science Foundation and
                    funds from the Georgia Research Alliance, Georgia Seed Development, and University of Georgia.
                </Text>
                <Text mt={4} textAlign="center" fontWeight="bold">
                    Comments or Questions? Send e-mail to{' '}
                    <Link href="mailto:ricegenome@uga.edu" color="red.500">
                        Rice Genome Annotation Project Team at UGA
                    </Link>
                </Text>
            </Box>
        </MainTemPlate>
    );
};

export default HomeOverview;
