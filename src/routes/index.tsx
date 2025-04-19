import { lazy } from 'react';

export const Home = lazy(() => import('../components/pages/Home'));
export const Go = lazy(() => import('../components/pages/Go'));
export const Nust = lazy(() => import('../components/pages/Nust'));
export const DataStore = lazy(() => import('../components/pages/DataStore'));
export const GermplasmSoy = lazy(() => import('../components/pages/GermplasmSoy'));
export const New = lazy(() => import('../components/pages/New'));
export const Event = lazy(() => import('../components/pages/Event'));
export const GoEnrichmentBlog = lazy(() => import('../components/pages/Post/GoEnrichmentBlog'));
export const Search = lazy(() => import('../components/pages/Search'));
export const Post = lazy(() => import('../components/pages/Post'));
export const GeneTranslation = lazy(() => import('../components/pages/GeneTranslation'));
export const PostAdmin = lazy(() => import('../components/pages/PostAdmin'));
export const PostDetail = lazy(() => import('../components/pages/PostDetail'));
export const GeneFamily = lazy(() => import('../components/pages/GenneFamilyManager'));
export const Strain = lazy(() => import('../components/pages/StrainManager'));
export const PanGeneSet = lazy(() => import('../components/pages/PanGeneSetManager'));
export const Species = lazy(() => import('../components/pages/SpeciesManager'));
export const Gene = lazy(() => import('../components/pages/GeneManager'));
export const Study = lazy(() => import('../components/pages/StudyManager'));
