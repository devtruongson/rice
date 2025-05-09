import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';
import ManagerTemplate from '../../templates/ManagerTemplate';
import Manager from './Manager';
import New from './New';

const tabRoutes = ['manager', 'new', 'edit'];

const Dscensors = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const tabIndex = tabRoutes.indexOf(currentPath || 'manager');

    // Colors for better UI
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const activeTabColor = useColorModeValue('blue.500', 'blue.300');

    const handleTabsChange = (index: number) => {
        navigate(routesMap.Dscensor.replace('/*', `/${tabRoutes[index]}`));
    };

    return (
        <ManagerTemplate>
            <Box bg={bgColor} borderRadius="lg" boxShadow="md" overflow="hidden" m={4}>
                <Tabs index={tabIndex} onChange={handleTabsChange} colorScheme="blue" variant="enclosed">
                    <TabList
                        borderBottomWidth="1px"
                        borderColor={borderColor}
                        bg={useColorModeValue('gray.50', 'gray.900')}
                        px={4}
                    >
                        <Tab
                            py={4}
                            fontWeight="medium"
                            _selected={{ color: activeTabColor, borderBottomColor: activeTabColor }}
                        >
                            Quản lý
                        </Tab>
                        <Tab
                            py={4}
                            fontWeight="medium"
                            _selected={{ color: activeTabColor, borderBottomColor: activeTabColor }}
                        >
                            Tạo mới
                        </Tab>
                        <Tab display="none" py={4} fontWeight="medium">
                            New
                        </Tab>
                    </TabList>

                    <TabPanels p={6}>
                        <TabPanel>
                            <Routes>
                                <Route path="manager" element={<Manager />} />
                            </Routes>
                        </TabPanel>
                        <TabPanel>
                            <Routes>
                                <Route path="new" element={<New />} />
                            </Routes>
                        </TabPanel>
                        <TabPanel>
                            <Routes>
                                <Route path="edit" element={<New />} />
                            </Routes>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </ManagerTemplate>
    );
};

export default Dscensors;
