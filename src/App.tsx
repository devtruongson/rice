// import { Container, Image } from '@chakra-ui/react';
// import Header from './components/organisms/Header';
// import RiceGenomeProject from './components/pages/RiceGenomeProject';
// import { Route, Routes } from 'react-router-dom';
// import HomeOverview from './components/pages/HomeOverview';

// function App() {
//     return (
//         <Container
//             border={'1px solid #ccc'}
//             padding={0}
//             borderBottomLeftRadius={6}
//             borderBottomRightRadius={6}
//             overflow={'hidden'}
//             mb={10}
//         >
//             <Image w={'100%'} objectFit={'cover'} src="https://rice.uga.edu/images/TestLogo2.png" alt="" />
//             <Header />

//             <Routes>
//                 <Route path="/" element={<RiceGenomeProject />} />
//                 <Route path="/home_overview" element={<HomeOverview />}></Route>
//             </Routes>
//         </Container>
//     );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { Suspense } from 'react';
import { Progress } from '@chakra-ui/react';
import { GlobalProvider } from './contexts/GlobalContext';

const router = createBrowserRouter(
    routes.map((route) => ({
        ...route,
        element: <ProtectedRoute {...route}>{route.element}</ProtectedRoute>,
    })),
);

function App() {
    return (
        <Suspense fallback={<Progress size="xs" isIndeterminate position="fixed" top={0} left={0} right={0} h={0.5} />}>
            <GlobalProvider>
                <RouterProvider router={router} />
            </GlobalProvider>
        </Suspense>
    );
}

export default App;
