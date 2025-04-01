import { Box } from '@chakra-ui/react';
import { HEADER_HEIGHT } from '../../constants';
import Header from '../organisms/Header';
import Wrapper from './Wrapper';

type Props = {
    children: React.ReactNode;
};

const PostTemplate = ({ children }: Props) => {
    return (
        <Box pb={10} pt={HEADER_HEIGHT}>
            <Header />
            <Wrapper isPost>{children}</Wrapper>
        </Box>
    );
};

export default PostTemplate;
