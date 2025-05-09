import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ManagerTemplate from '../../templates/ManagerTemplate';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Manager from './Manager';
import New from './New';
import { routesMap } from '../../../routes/routes';

const tabRoutes = ['manager', 'new', 'edit'];
const GeneManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const tabIndex = tabRoutes.indexOf(currentPath || 'manager');

    const handleTabsChange = (index: number) => {
        navigate(routesMap.Gene.replace('/*', `/${tabRoutes[index]}`));
    };

    return (
        <ManagerTemplate>
            <Box>
                <Tabs index={tabIndex} onChange={handleTabsChange}>
                    <TabList>
                        <Tab>Quản lý</Tab>
                        <Tab>Tạo mới</Tab>
                        <Tab display="none">New</Tab>
                    </TabList>

                    <TabPanels px={5}>
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

export default GeneManager;
