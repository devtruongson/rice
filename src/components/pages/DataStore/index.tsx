import { Box, HStack, Image } from '@chakra-ui/react';
import logo from '../../../assets/sb_logo.png';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';

const DataStore = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <HStack>
                <Image src={logo} alt="logo" w={'60px'} h={'60px'} onClick={() => navigate(routesMap.Home)} />
            </HStack>
        </Box>
    );
};

export default DataStore;
