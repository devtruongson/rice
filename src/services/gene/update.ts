import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneResType } from '../../type/gene';

const updateGene = async (payload: GeneResType) => {
    const { data } = await api.patch('/gene', payload);
    return data;
};

type UpdateGeneCustomType = {
    mutationConfig?: MutationConfig<typeof updateGene>;
};

export const useUpdateGene = ({ mutationConfig }: UpdateGeneCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateGene,
    });
};
