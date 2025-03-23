import { Container } from '@chakra-ui/react';

type Props = { children: React.ReactNode };
const Wrapper = ({ children }: Props) => {
    return <Container maxW={'90%'}>{children}</Container>;
};

export default Wrapper;
