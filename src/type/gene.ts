import * as yup from 'yup';
import { searchGeneFormSchema } from '../components/organisms/SearchForm/form-schema';
import { searchTranslationFormSchema } from '../components/organisms/SearchTranslationForm/form-schema';

export type SearchGeneFormType = yup.InferType<typeof searchGeneFormSchema>;
export type SearchTranslationFormType = yup.InferType<typeof searchTranslationFormSchema>;

export type GeneCreateType = {
    name: string;
    arabidopsis_hit: string;
    go_terms: string[];
    identifier: {
        name: string;
        path_detail: string;
    };
    location: {
        name: string;
        path_detail: string;
    };
    description: string;
    gene_family: string;
    pan_gene_set: string;
    species: string;
    strain: string;
};

export type GeneUpdateType = {
    _id: string;
} & GeneCreateType;

export type GeneResType = {
    genus: string;
} & GeneUpdateType;
