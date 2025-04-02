import React from 'react';
import { HEADER_HEIGHT } from '../../constants';
import Header from '../organisms/Header';
import { Box } from '@chakra-ui/react';
import Wrapper from './Wrapper';

type Props = { children: React.ReactNode; size?: 'big' | 'medium' | 'small' };

const BasicTemplate = ({ children, size }: Props) => {
    return (
        <Box pb={10} pt={HEADER_HEIGHT}>
            <Header />
            <Wrapper size={size}>
                <Box pt={10}>{children}</Box>
            </Wrapper>
        </Box>
    );
};

export default BasicTemplate;
