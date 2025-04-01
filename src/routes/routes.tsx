import { Blog, DataStore, Event, GermplasmSoy, Go, GoEnrichmentBlog, Home, New, Nust, SBWBlog } from './index';

export const routes = [
    {
        name: 'Home',
        path: '/',
        element: <Home />,
        requiresAuth: false,
    },
    {
        name: 'Go',
        path: '/tools/analysis/go',
        element: <Go />,
        requiresAuth: false,
    },
    {
        name: 'Nust',
        path: '/tools/nust',
        element: <Nust />,
        requiresAuth: false,
    },
    {
        name: 'DataStore',
        path: '/data_store',
        element: <DataStore />,
        requiresAuth: false,
    },
    {
        name: 'GermplasmSoy',
        path: '/tools/snp50k/',
        element: <GermplasmSoy />,
        requiresAuth: false,
    },
    {
        name: 'Blog',
        path: '/blog',
        element: <Blog />,
        requiresAuth: false,
    },
    {
        name: 'New',
        path: '/news',
        element: <New />,
        requiresAuth: false,
    },
    {
        name: 'Event',
        path: '/events',
        element: <Event />,
        requiresAuth: false,
    },
    {
        name: 'GoEnrichmentBlog',
        path: '/blog/2024/07/01/go-enrichment',
        element: <GoEnrichmentBlog />,
        requiresAuth: false,
    },
    {
        name: 'SBWBlog',
        path: '/blog/2024/02/01/SBW',
        element: <SBWBlog />,
        requiresAuth: false,
    },
] as const;

type RouteName = (typeof routes)[number]['name'];

type RoutesMap = {
    [K in RouteName]: (typeof routes)[number]['path'];
};

export const routesMap = ((): RoutesMap => {
    return routes.reduce((acc, route) => {
        acc[route.name] = route.path;
        return acc;
    }, {} as RoutesMap);
})();
