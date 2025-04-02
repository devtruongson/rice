import * as yup from 'yup';

export const searchTranslationFormSchema = yup.object().shape({
    identifier: yup.string().optional(),
    genus: yup.string().optional(),
    species: yup.string().optional(),
    strain: yup.string().optional(),
    assembly: yup.string().optional(),
    annotation: yup.string().optional(),
});

export const defaultSearchTranslationFormSchema = {
    genus: '',
    species: '',
    strain: '',
    identifier: '',
    assembly: '',
    annotation: '',
};
