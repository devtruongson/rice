// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './libs/query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // Query client 
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* Chakra provider */}
        <ChakraProvider theme={theme}>
            {/* App */}
            <App />
        </ChakraProvider>
    </QueryClientProvider>,
    // <React.StrictMode>
    // </React.StrictMode>,
);
