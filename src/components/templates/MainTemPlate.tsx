import React from 'react';
import Header from '../organisms/Header';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';
import { HEADER_HEIGHT, NAVBAR_WIDTH } from '../../constants';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box pb={10} pt={HEADER_HEIGHT}>
            <Header />
            <Flex>
                <Navbar />
                <Box ml={NAVBAR_WIDTH} p={20} w="full">
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default MainTemPlate;
