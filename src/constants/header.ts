import { routesMap } from '../routes/routes';

export const listCatesHeader = [
    {
        label: 'Home',
        path: routesMap.Home,
        children: [],
    },
    {
        label: 'Tools',
        path: '/',
        children: [
            {
                label: 'GO Enrichment Analysis',
                isBlank: false,
                path: routesMap.Go,
            },
            {
                label: 'Northern Uniform Soybean Trials (NUST)',
                isBlank: false,
                path: routesMap.Nust,
            },
            {
                label: 'Datastore',
                isBlank: false,
                path: routesMap.DataStore,
            },
            {
                label: 'GlycineMine',
                path: 'https://mines.legumeinfo.org/glycinemine/begin.do',
                isBlank: true,
            },
            {
                label: 'Data Overviews for soy genomic data',
                isBlank: true,
                path: 'https://dscensor.legumeinfo.org/multiqc-demo/genome_main:Glycine',
            },
            {
                label: 'USDA Germplasm SoySNP50K',
                isBlank: false,
                path: routesMap.GermplasmSoy,
            },
            {
                label: 'GRIN Data Explorer',
                isBlank: true,
                path: 'https://legacy.soybase.org/grindata/',
            },
            {
                label: 'Gene Expression Explorer',
                isBlank: true,
                path: 'https://legacy.soybase.org/experiments/',
            },
            {
                label: 'Gene-name translator',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Gene Search Tool',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Trait Search Tool',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'SoyCyc',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'SoyBase SequenceServer BLAST',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Annotate Your Sequences',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Genome browsers',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Genome Context Viewer for Glycine',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'ZZBrowse GWAS/QTL',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'CMap-js: Genetic Map Viewer',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'LIS Germplasm GIS Viewer',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Expression Resources',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'GCViT: SNP Comparison Tool',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Ontology',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Parentage',
                isBlank: false,
                path: routesMap.Home,
            },
        ],
    },
    {
        label: 'Maps',
        path: '/',
        children: [],
    },
    {
        label: 'Genomics',
        path: '/',
        children: [],
    },
    {
        label: 'Data Collections',
        path: '/',
        children: [
            {
                label: 'Max',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Soja',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Cyrtoloba',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Dolichocarpa',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Falcata',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Stenophita',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'Syndetika',
                isBlank: false,
                path: routesMap.Home,
            },
            {
                label: 'D3-tomentella',
                isBlank: false,
                path: routesMap.Home,
            },
        ],
    },
    {
        label: 'Projects',
        path: '/',
        children: [
            { label: '1502 Accession Genotyping', path: '/', isBlank: false },
            { label: '180K Axiom SNP Array', path: '/', isBlank: false },
            { label: 'BARC Soybean Potential SSR', path: '/', isBlank: false },
            { label: 'Cultivar resequencing of 481 diverse accessions', path: '/', isBlank: false },
            { label: 'Cysteine protease and cystatin expression', path: '/', isBlank: false },
            { label: 'DNA Methylomes of Two Legume Species', path: '/', isBlank: false },
            { label: 'Development of INDEL markers', path: '/', isBlank: false },
            { label: 'Improving Biotic and Abiotic Stress Tolerance', path: '/', isBlank: false },
            { label: 'Lee and PI 483463 Reference Genomes', path: '/', isBlank: false },
            { label: 'Milestone Cultivar Sequencing', path: '/', isBlank: false },
            { label: 'NJAU 335 SNP Array', path: '/', isBlank: false },
            { label: 'Pangenome of 204 northern elite cultivars', path: '/', isBlank: false },
            { label: 'Sclerotinia stem rot resistance', path: '/', isBlank: false },
            { label: 'Seed Protein and Oil QTLs', path: '/', isBlank: false },
            { label: 'Sequencing the USDA core soybean collection', path: '/', isBlank: false },
            { label: 'SoyMap II', path: '/', isBlank: false },
            { label: 'SoyNAM', path: '/', isBlank: false },
            { label: 'Soybean EMS Mutagenized Population', path: '/', isBlank: false },
            { label: 'Soybean Fast Neutron Mutants', path: '/', isBlank: false },
            { label: 'Soybean Haplotype Map', path: '/', isBlank: false },
            { label: 'Soybean Transposable Elements / SoyTEdb', path: '/', isBlank: false },
        ],
    },
    {
        label: 'Community',
        path: '/',
        children: [],
    },
    {
        label: 'About & Contact',
        path: '/',
        children: [],
    },
    {
        label: 'Help & Tutorials',
        path: '/',
        children: [],
    },
];
