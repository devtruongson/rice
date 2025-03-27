import React from 'react';
import Header from '../organisms/Header';
import { Box } from '@chakra-ui/react';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box pb={10}>
            <Header />
            {children}
        </Box>
    );
};

export default MainTemPlate;
