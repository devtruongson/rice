import { DataStore, GeneTranslation, GermplasmSoy, Go, GoEnrichmentBlog, Home, Nust, Post, Search } from './index';

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
        name: 'Search',
        path: '/tools/search/gene',
        element: <Search />,
        requiresAuth: false,
    },
    {
        name: 'GeneTranslation',
        path: '/tools/translate',
        element: <GeneTranslation />,
        requiresAuth: false,
    },
    //TODO
    {
        name: 'Blog',
        path: '/blog',
        element: <Post />,
        requiresAuth: false,
    },
    {
        name: 'New',
        path: '/news',
        element: <Post />,
        requiresAuth: false,
    },
    {
        name: 'Event',
        path: '/events',
        element: <Post />,
        requiresAuth: false,
    },
    {
        name: 'GoEnrichmentBlog',
        path: '/blog/2024/07/01/go-enrichment',
        element: <GoEnrichmentBlog />,
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
