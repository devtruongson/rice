import { BoxProps, Container } from '@chakra-ui/react';

type Props = { children: React.ReactNode; isPost?: boolean } & BoxProps;
const Wrapper = ({ children, isPost = false, ...props }: Props) => {
    return (
        <Container maxW={isPost ? '50%' : '80%'} {...props}>
            {children}
        </Container>
    );
};

export default Wrapper;
