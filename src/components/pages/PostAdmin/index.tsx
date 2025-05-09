import {
    Box,
    Container,
    Divider,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
} from '@chakra-ui/react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ManagerTemplate from '../../templates/ManagerTemplate';
import PostManager from './PostManager';
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

    // Theme colors
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const activeTabColor = useColorModeValue('blue.500', 'blue.300');
    const headerBg = useColorModeValue('gray.50', 'gray.900');

    return (
        <ManagerTemplate>
            <Container maxW="container.xl" p={0}>
                <Box bg={headerBg} borderBottom="1px" borderColor={borderColor} p={4} mb={4} borderRadius="md">
                    <Heading size="lg" mb={2}>
                        Quản lý bài đăng{' '}
                    </Heading>
                    <Divider mb={4} />

                    <Tabs index={tabIndex} onChange={handleTabsChange} colorScheme="blue" variant="enclosed" isLazy>
                        <TabList>
                            <Tab
                                fontWeight="semibold"
                                _selected={{
                                    color: activeTabColor,
                                    borderColor: borderColor,
                                    borderBottom: 'none',
                                    bg: bgColor,
                                }}
                                mr={2}
                                borderRadius="md md 0 0"
                            >
                                Quản lý bài đăng{' '}
                            </Tab>
                            <Tab
                                fontWeight="semibold"
                                _selected={{
                                    color: activeTabColor,
                                    borderColor: borderColor,
                                    borderBottom: 'none',
                                    bg: bgColor,
                                }}
                                borderRadius="md md 0 0"
                            >
                                Tạo bài đăng mới{' '}
                            </Tab>
                            <Tab
                                display="none"
                                _selected={{
                                    color: activeTabColor,
                                    borderColor: borderColor,
                                    borderBottom: 'none',
                                    bg: bgColor,
                                }}
                                borderRadius="md md 0 0"
                            >
                                Edit Post
                            </Tab>
                        </TabList>

                        <TabPanels
                            bg={bgColor}
                            borderX="1px"
                            borderBottom="1px"
                            borderColor={borderColor}
                            borderRadius="0 0 md md"
                            boxShadow="sm"
                        >
                            <TabPanel p={6}>
                                <Routes>
                                    <Route path="manager" element={<PostManager />} />
                                </Routes>
                            </TabPanel>
                            <TabPanel p={6}>
                                <Routes>
                                    <Route path="new" element={<PostNew />} />
                                </Routes>
                            </TabPanel>
                            <TabPanel p={6}>
                                <Routes>
                                    <Route path="edit" element={<PostNew />} />
                                </Routes>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </ManagerTemplate>
    );
};

export default PostAdmin;
