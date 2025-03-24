import React from 'react';
import Header from '../organisms/Header';
import Wrapper from './Wrapper';
import { Box, Image } from '@chakra-ui/react';
import Footer from '../organisms/Footer';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Wrapper pt={4} pb={10}>
            <Image w={'100%'} objectFit={'cover'} src="https://rice.uga.edu/images/TestLogo2.png" alt="" />
            <Box bg="gray.100" borderRadius="lg" boxShadow="lg">
                <Header />
                {children}
                <Footer />
            </Box>
        </Wrapper>
    );
};

export default MainTemPlate;
