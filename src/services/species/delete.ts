import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';

const deleteSpecies = async (id: string) => {
    const { data } = await api.delete(`/species/${id}`);
    return data;
};

type DeleteSpeciesCustomType = {
    mutationConfig?: MutationConfig<typeof deleteSpecies>;
};

export const useDeleteSpecies = ({ mutationConfig }: DeleteSpeciesCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteSpecies,
    });
};
