import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneFamilyCreateType } from '../../type/geneFamily';

const createGeneFamily = async (payload: GeneFamilyCreateType) => {
    const { data } = await api.post('/gene-family', payload);
    return data;
};

type CreateGeneFamilyCustomType = {
    mutationConfig?: MutationConfig<typeof createGeneFamily>;
};

export const useCreateGeneFamily = ({ mutationConfig }: CreateGeneFamilyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createGeneFamily,
    });
};
