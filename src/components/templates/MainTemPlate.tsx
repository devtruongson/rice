import { Box } from '@chakra-ui/react';
import React from 'react';
import Header from '../organisms/Header';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box>
            <Header />
            {children}
        </Box>
    );
};

export default MainTemPlate;
