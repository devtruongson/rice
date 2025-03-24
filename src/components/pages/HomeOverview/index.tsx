import { Box, Text } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';

const HomeOverview = () => {
    return (
        <MainTemPlate>
            <Box mx="auto" p={6}>
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
            </Box>
        </MainTemPlate>
    );
};

export default HomeOverview;
