import { routesMap } from '../routes/routes';

export const personalBrand = 'Cassava';
export const HEADER_HEIGHT = 130;
export const NAVBAR_WIDTH = 300;

export const listTransitFirst = [
    { label: 'Sequence search (BLAST)', path: '/' },
    { label: 'GlycineMine', path: 'https://dscensor.legumeinfo.org/multiqc-demo/genome_main:Glycine' },
    { label: 'Genetic & trait maps', path: '/' },
    { label: 'GWAS viewer', path: '/' },
    { label: 'Germplasm GISs', path: '/' },
    { label: 'Other legumes', path: '/' },
];

export const listTransitSecond = [
    { label: 'Annotate sequences', path: '/' },
    { label: 'Trait association search', path: '/' },
    { label: 'Genome browsers', path: '/' },
    { label: 'QTL viewer', path: '/' },
    { label: 'Metabolic pathways', path: '/' },
    { label: 'Expression resources', path: '/' },
];

export const listTranstLast = [
    { label: 'Pangenes / gene translator', path: '/' },
    { label: 'GO enrichment', path: routesMap.Go },
    { label: 'Genotype comparisons', path: '/' },
    { label: 'cross-species QTL/GWASs', path: '/' },
    { label: 'Parentage & pedigrees', path: '/' },
    { label: 'Help & Tutorials', path: '/' },
];

export const blogsDefault = {
    _id: '',
    title: 'GO Enrichments',
    sub_title: 'Cassava offers two methods for calculating GO enrichment. This post explains these approaches.',
    createdAt: '01 July 2024',
    path: routesMap.GoEnrichmentBlog,
    author: 'Steven Cannon',
    description: 'Cassava offers two methods for calculating GO enrichment. This post explains these approaches.',
    type: 'blog',
};

export const news = [];

export const events = [];

export const navbarAdmin = [
    {
        icon: '',
        label: 'Post',
        url: routesMap.PostAdmin,
    },
    {
        icon: '',
        label: 'Post',
        url: '/',
    },
];

export const typePost = [
    { label: 'Blog', value: 'blog' },
    { label: 'New', value: 'new' },
    { label: 'Event', value: 'event' },
];
