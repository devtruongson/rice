import {
    DataStore,
    GeneTranslation,
    GermplasmSoy,
    Go,
    GoEnrichmentBlog,
    Home,
    Nust,
    Post,
    PostAdmin,
    PostDetail,
    Search,
    GeneFamily,
    Strain,
    PanGeneSet,
    Species,
    Gene,
} from './index';

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
    {
        name: 'PostAdmin',
        path: '/admin/post/*',
        element: <PostAdmin />,
        requiresAuth: true,
    },
    {
        name: 'PostDetail',
        path: '/post/:id',
        element: <PostDetail />,
        requiresAuth: true,
    },
    {
        name: 'GeneFamily',
        path: '/admin/gene_family/*',
        element: <GeneFamily />,
        requiresAuth: true,
    },
    {
        name: 'Strain',
        path: '/admin/strain/*',
        element: <Strain />,
        requiresAuth: true,
    },
    {
        name: 'PanGeneSet',
        path: '/admin/pan_gene_set/*',
        element: <PanGeneSet />,
        requiresAuth: true,
    },
    {
        name: 'Species',
        path: '/admin/species/*',
        element: <Species />,
        requiresAuth: true,
    },
    {
        name: 'Gene',
        path: '/admin/gene/*',
        element: <Gene />,
        requiresAuth: true,
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
