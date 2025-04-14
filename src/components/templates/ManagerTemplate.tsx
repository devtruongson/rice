import { Box, Flex } from '@chakra-ui/react';
import { HEADER_HEIGHT, NAVBAR_WIDTH } from '../../constants';
import Header from '../organisms/Header';
import NavbarAdmin from '../organisms/Navbar/NavbarAdmin';

type Props = {
    children: React.ReactNode;
};
const ManagerTemplate = ({ children }: Props) => {
    return (
        <Box pb={10} pt={HEADER_HEIGHT}>
            <Header type="admin" />
            <Flex>
                <NavbarAdmin />
                <Box ml={NAVBAR_WIDTH} pl={4} w="full">
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default ManagerTemplate;
