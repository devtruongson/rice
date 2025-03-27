import { Box } from '@chakra-ui/react';
import { HEADER_HEIGHT, NAVBAR_WIDTH } from '../../../constants';

const Navbar = () => {
    return <Box width={NAVBAR_WIDTH} h={`calc(100vh - ${HEADER_HEIGHT}px)`} overflowY="auto" p={45}></Box>;
};

export default Navbar;
