import { Box, Divider, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HEADER_HEIGHT, NAVBAR_WIDTH, navbarAdmin } from '../../../constants';
import colors from '../../../constants/colors';

const NavbarAdmin = () => {
    const pathname = useLocation().pathname;
    const isActive = useCallback((url: string) => pathname.includes(url.split('*')[0]), [pathname]);
    const navigate = useNavigate();

    return (
        <Box
            width={NAVBAR_WIDTH}
            h={`calc(100vh - ${HEADER_HEIGHT}px)`}
            overflowY="auto"
            position="fixed"
            left={0}
            bottom={0}
            top={HEADER_HEIGHT}
            boxShadow="lg"
            borderRight="1px"
            borderColor="gray.100"
            bg="white"
            transition="all 0.3s ease"
        >
            <VStack w="full" spacing={0} align="stretch">
                <Box py={4} px={6} bg="gray.50">
                    <Text fontWeight="bold" fontSize="lg" color={colors.brand}>
                        Admin Dashboard
                    </Text>
                </Box>

                <Divider />

                <VStack w="full" spacing={1} pt={3} pb={3}>
                    {navbarAdmin.map((item, index) => {
                        const active = isActive(item.url);
                        return (
                            <Tooltip key={index} label={item.label} placement="right" hasArrow isDisabled={active}>
                                <Box
                                    w="90%"
                                    mx="auto"
                                    py={3}
                                    px={4}
                                    cursor="pointer"
                                    borderRadius="md"
                                    transition="all 0.2s ease-in-out"
                                    _hover={{
                                        background: active ? colors.brand : 'gray.100',
                                        color: active ? 'white' : colors.brand,
                                        transform: 'translateX(5px)',
                                    }}
                                    background={active ? colors.brand : 'transparent'}
                                    color={active ? 'white' : 'gray.700'}
                                    fontWeight={active ? 'semibold' : 'normal'}
                                    onClick={() => navigate(item.url.replace('/*', '/manager'))}
                                >
                                    <HStack justify="space-between">
                                        <Text>{item.label}</Text>
                                        {active && <ChevronRight size={16} />}
                                    </HStack>
                                </Box>
                            </Tooltip>
                        );
                    })}
                </VStack>

                <Divider mt="auto" />

                <Box py={4} px={6} mt="auto">
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                        © {new Date().getFullYear()} Admin Panel
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default NavbarAdmin;
