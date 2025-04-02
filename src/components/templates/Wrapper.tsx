import { BoxProps, Container } from '@chakra-ui/react';

type Props = { children: React.ReactNode; size?: 'big' | 'medium' | 'small' } & BoxProps;
const Wrapper = ({ children, size = 'medium', ...props }: Props) => {
    return (
        <Container maxW={size === 'big' ? '90%' : size === 'medium' ? '80%' : '50%'} {...props}>
            {children}
        </Container>
    );
};

export default Wrapper;
