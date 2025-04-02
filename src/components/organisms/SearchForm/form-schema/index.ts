import * as yup from 'yup';

export const searchGeneFormSchema = yup.object().shape({
    genus: yup.string().optional(),
    species: yup.string().optional(),
    strain: yup.string().optional(),
    identifier: yup.string().optional(),
    description: yup.string().optional(),
    gene_family_id: yup.string().optional(),
});
export const defaultsearchGeneFormSchema = {
    genus: '',
    species: '',
    strain: '',
    identifier: '',
    description: '',
    gene_family_id: '',
};
