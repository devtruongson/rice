import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneCreateType } from '../../type/gene';

const createGene = async (payload: GeneCreateType) => {
    const { data } = await api.post('/gene', payload);
    return data;
};

type CreateGeneCustomType = {
    mutationConfig?: MutationConfig<typeof createGene>;
};

export const useCreateGene = ({ mutationConfig }: CreateGeneCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createGene,
    });
};
