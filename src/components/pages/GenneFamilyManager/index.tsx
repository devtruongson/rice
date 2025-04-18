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
import { FaDatabase, FaEdit, FaPlus } from 'react-icons/fa';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';
import ManagerTemplate from '../../templates/ManagerTemplate';
import Manager from './Manager';
import New from './New';

const tabRoutes = ['manager', 'new', 'edit'];

const GeneFamilyManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const tabIndex = tabRoutes.indexOf(currentPath || 'manager');

    const handleTabsChange = (index: number) => {
        navigate(routesMap.GeneFamily.replace('/*', `/${tabRoutes[index]}`));
    };

    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const headerBg = useColorModeValue('gray.50', 'gray.900');
    const tabBg = useColorModeValue('blue.50', 'blue.900');
    const activeTabBg = useColorModeValue('white', 'gray.800');

    return (
        <ManagerTemplate>
            <Container maxW="container.xl" py={4}>
                <Box bg={headerBg} borderRadius="lg" boxShadow="sm" overflow="hidden">
                    <Flex bg="blue.600" color="white" p={4} alignItems="center" justifyContent="space-between">
                        <Heading size="lg">Gene Family Management</Heading>
                    </Flex>

                    <Tabs index={tabIndex} onChange={handleTabsChange} colorScheme="blue" variant="soft-rounded" isLazy>
                        <Box px={6} pt={4}>
                            <TabList gap={4}>
                                <Tab
                                    fontWeight="medium"
                                    px={5}
                                    py={3}
                                    bg={tabBg}
                                    _selected={{
                                        fontWeight: 'bold',
                                        bg: activeTabBg,
                                        boxShadow: 'md',
                                    }}
                                >
                                    <Icon as={FaDatabase} mr={2} />
                                    Manage Gene Families
                                </Tab>
                                <Tab
                                    fontWeight="medium"
                                    px={5}
                                    py={3}
                                    bg={tabBg}
                                    _selected={{
                                        fontWeight: 'bold',
                                        bg: activeTabBg,
                                        boxShadow: 'md',
                                    }}
                                >
                                    <Icon as={FaPlus} mr={2} />
                                    Add New Gene Family
                                </Tab>
                                <Tab
                                    display="none"
                                    _selected={{
                                        fontWeight: 'bold',
                                        bg: activeTabBg,
                                        boxShadow: 'md',
                                    }}
                                >
                                    <Icon as={FaEdit} mr={2} />
                                    Edit Gene Family
                                </Tab>
                            </TabList>
                        </Box>

                        <Divider mt={4} borderColor={borderColor} />

                        <TabPanels bg={bgColor}>
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

export default GeneFamilyManager;
