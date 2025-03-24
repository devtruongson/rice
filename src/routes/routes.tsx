import { AnnotationOryza, Contatcts, FAQ, Home, News, OverView } from './index';

export const routes = [
    {
        name: 'Home',
        path: '/',
        element: <Home />,
        requiresAuth: false,
    },
    {
        name: 'OverView',
        path: '/home_overview',
        element: <OverView />,
        requiresAuth: false,
    },
    {
        name: 'Contatcts',
        path: '/home_contacts',
        element: <Contatcts />,
        requiresAuth: false,
    },
    {
        name: 'News',
        path: '/home_news',
        element: <News />,
        requiresAuth: false,
    },
    {
        name: 'FAQ',
        path: '/home_faq',
        element: <FAQ />,
        requiresAuth: false,
    },
    {
        name: 'AnnotationOryza',
        path: '/annotation_oryza',
        element: <AnnotationOryza />,
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
