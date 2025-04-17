import { Box, VStack } from '@chakra-ui/react';
import { HEADER_HEIGHT, NAVBAR_WIDTH, navbarAdmin } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import colors from '../../../constants/colors';
import { useCallback } from 'react';

const NavbarAdmin = () => {
    const pathname = useLocation().pathname;
    const isActive = useCallback((url: string) => (url.includes(pathname) ? colors.brand : ''), [pathname]);
    const navigate = useNavigate();
    return (
        <Box
            width={NAVBAR_WIDTH}
            h={`calc(100vh - ${HEADER_HEIGHT}px)`}
            overflowY="auto"
            pt={1}
            position="fixed"
            left={0}
            bottom={0}
            top={HEADER_HEIGHT}
        >
            <VStack w="full" gap={1}>
                {navbarAdmin.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            w="full"
                            py={2}
                            px={6}
                            cursor="pointer"
                            _hover={{
                                background: colors.brand,
                                color: 'white',
                            }}
                            background={isActive(item.url) && colors.brand}
                            color={isActive(item.url) && 'white'}
                            onClick={() => navigate(item.url.replace('/*', '/manager'))}
                        >
                            {item.label}
                        </Box>
                    );
                })}
            </VStack>
        </Box>
    );
};

export default NavbarAdmin;
