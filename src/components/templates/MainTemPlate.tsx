import React from 'react';
import Header from '../organisms/Header';
import Wrapper from './Wrapper';
import { Image } from '@chakra-ui/react';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Wrapper pt={4}>
            <Image w={'100%'} objectFit={'cover'} src="https://rice.uga.edu/images/TestLogo2.png" alt="" />
            <Header />
            {children}
        </Wrapper>
    );
};

export default MainTemPlate;
