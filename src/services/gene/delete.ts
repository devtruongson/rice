import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';

const deleteGene = async (id: string) => {
    const { data } = await api.delete(`/gene/${id}`);
    return data;
};

type DeleteGeneType = {
    mutationConfig?: MutationConfig<typeof deleteGene>;
};

export const useDeleteGene = ({ mutationConfig }: DeleteGeneType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteGene,
    });
};
