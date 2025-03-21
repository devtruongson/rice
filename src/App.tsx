import { Container, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import './App.css';
import Header from './components/group/Header';
import RiceGenomeProject from './components/group/RiceGenomeProject';
import { useColorMode } from './components/ui/color-mode';
import { Route, Routes } from 'react-router-dom';
import HomeOverview from './components/group/HomeOverview';

function App() {
    const { setColorMode } = useColorMode();

    useEffect(() => {
        setColorMode('light');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container
            border={'1px solid #ccc'}
            padding={0}
            borderBottomLeftRadius={6}
            borderBottomRightRadius={6}
            overflow={'hidden'}
            mb={10}
        >
            <Image w={'100%'} objectFit={'cover'} src="https://rice.uga.edu/images/TestLogo2.png" alt="" />
            <Header />

            <Routes>
                <Route path="/" element={<RiceGenomeProject />} />
                <Route path="/home_overview" element={<HomeOverview />}></Route>
            </Routes>
        </Container>
    );
}

export default App;
