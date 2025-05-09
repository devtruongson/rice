import {
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaPencilAlt, FaPlus, FaVial } from 'react-icons/fa';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';
import ManagerTemplate from '../../templates/ManagerTemplate';
import Manager from './Manager';
import New from './New';

const tabRoutes = ['manager', 'new', 'edit'];

const StrainManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const tabIndex = tabRoutes.indexOf(currentPath || 'manager');

    const handleTabsChange = (index: number) => {
        navigate(routesMap.Strain.replace('/*', `/${tabRoutes[index]}`));
    };

    // Theme colors
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const activeTabBg = useColorModeValue('white', 'gray.800');

    return (
        <ManagerTemplate>
            <Container maxW="container.xl" py={4}>
                <Box
                    bg={bgColor}
                    borderRadius="lg"
                    boxShadow="md"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={borderColor}
                >
                    <Flex bg="purple.600" color="white" p={4} alignItems="center">
                        <Icon as={FaVial} boxSize={6} mr={3} />
                        <Heading size="lg">Quản lý Strain</Heading>
                    </Flex>

                    <Tabs index={tabIndex} onChange={handleTabsChange} colorScheme="purple" variant="enclosed" isLazy>
                        <Box px={6} pt={4}>
                            <TabList gap={2}>
                                <Tab
                                    fontWeight="medium"
                                    px={5}
                                    py={3}
                                    _selected={{
                                        color: 'purple.600',
                                        fontWeight: 'bold',
                                        bg: activeTabBg,
                                        borderColor: borderColor,
                                        borderBottom: 'none',
                                    }}
                                >
                                    <Icon as={FaVial} mr={2} />
                                    Danh sách Strain
                                </Tab>
                                <Tab
                                    fontWeight="medium"
                                    px={5}
                                    py={3}
                                    _selected={{
                                        color: 'purple.600',
                                        fontWeight: 'bold',
                                        bg: activeTabBg,
                                        borderColor: borderColor,
                                        borderBottom: 'none',
                                    }}
                                >
                                    <Icon as={FaPlus} mr={2} />
                                    Tạo Strain
                                </Tab>
                                <Tab
                                    display="none"
                                    _selected={{
                                        color: 'purple.600',
                                        fontWeight: 'bold',
                                        bg: activeTabBg,
                                        borderColor: borderColor,
                                        borderBottom: 'none',
                                    }}
                                >
                                    <Icon as={FaPencilAlt} mr={2} />
                                    Edit Strain
                                </Tab>
                            </TabList>
                        </Box>

                        <Divider borderColor={borderColor} />

                        <TabPanels>
                            <TabPanel p={6}>
                                <Routes>
                                    <Route path="manager" element={<Manager />} />
                                </Routes>
                            </TabPanel>
                            <TabPanel p={6}>
                                <Routes>
                                    <Route path="new" element={<New />} />
                                </Routes>
                            </TabPanel>
                            <TabPanel p={6}>
                                <Routes>
                                    <Route path="edit" element={<New />} />
                                </Routes>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </ManagerTemplate>
    );
};

export default StrainManager;
