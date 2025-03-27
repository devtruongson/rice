import React from 'react';
import Header from '../organisms/Header';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box pb={10}>
            <Header />
            <Flex>
                <Navbar />
                {children}
            </Flex>
        </Box>
    );
};

export default MainTemPlate;
