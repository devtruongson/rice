import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { SpeciesResType } from '../../type/species';

const updateSpecies = async (payload: SpeciesResType) => {
    const { data } = await api.patch('/species', payload);
    return data;
};

type UpdateSpeciesCustomType = {
    mutationConfig?: MutationConfig<typeof updateSpecies>;
};

export const useUpdateSpecies = ({ mutationConfig }: UpdateSpeciesCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateSpecies,
    });
};
