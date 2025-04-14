import ManagerTemplate from '../../templates/ManagerTemplate';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PostManager from './PostManager';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PostNew from './PostNew';

const tabRoutes = ['manager', 'new', 'edit'];

const PostAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const tabIndex = tabRoutes.indexOf(currentPath || 'manager');

    const handleTabsChange = (index: number) => {
        navigate(`/admin/post/${tabRoutes[index]}`);
    };

    return (
        <ManagerTemplate>
            <Box>
                <Tabs index={tabIndex} onChange={handleTabsChange}>
                    <TabList>
                        <Tab>Manager</Tab>
                        <Tab>New</Tab>
                        <Tab display="none">New</Tab>
                    </TabList>

                    <TabPanels px={5}>
                        <TabPanel>
                            <Routes>
                                <Route path="manager" element={<PostManager />} />
                            </Routes>
                        </TabPanel>
                        <TabPanel>
                            <Routes>
                                <Route path="new" element={<PostNew />} />
                            </Routes>
                        </TabPanel>
                        <TabPanel>
                            <Routes>
                                <Route path="edit" element={<PostNew />} />
                            </Routes>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </ManagerTemplate>
    );
};

export default PostAdmin;
