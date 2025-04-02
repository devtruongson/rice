import * as yup from 'yup';
import { searchGeneFormSchema } from '../components/organisms/SearchForm/form-schema';

export type SearchGeneFormType = yup.InferType<typeof searchGeneFormSchema>;
