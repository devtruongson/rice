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
    id: '',
    title: 'GO Enrichments',
    date: '01 July 2024',
    path: routesMap.GoEnrichmentBlog,
    author: 'Steven Cannon',
    description: 'Cassava offers two methods for calculating GO enrichment. This post explains these approaches.',
};

export const news = [
    // {
    //     title: 'SBW2026 Theme Announced',
    //     date: '25 March 2025',
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    //     path: routesMap.GoEnrichmentBlog,
    // },
    // {
    //     title: 'Career Award Nominations due June 1st',
    //     date: '14 March 2025',
    //     path: routesMap.SBWBlog,
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    // },
    // {
    //     title: '2025 Soybean Breeders Tour',
    //     date: '07 March 2025',
    //     path: routesMap.SBWBlog,
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    // },
];

export const events = [
    // {
    //     title: 'SBW2026 Theme Announced',
    //     date: '25 March 2025',
    //     path: routesMap.GoEnrichmentBlog,
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    // },
    // {
    //     title: 'Career Award Nominations due June 1st',
    //     date: '14 March 2025',
    //     path: routesMap.SBWBlog,
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    // },
    // {
    //     title: '2025 Soybean Breeders Tour',
    //     date: '07 March 2025',
    //     path: routesMap.SBWBlog,
    //     author: 'Steven Cannon',
    //     description: 'SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.',
    // },
];
