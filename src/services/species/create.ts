import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { SpeciesCreateType } from '../../type/species';

const createSpecies = async (payload: SpeciesCreateType) => {
    const { data } = await api.post('/species', payload);
    return data;
};

type CreateSpeciesCustomType = {
    mutationConfig?: MutationConfig<typeof createSpecies>;
};

export const useCreateSpecies = ({ mutationConfig }: CreateSpeciesCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createSpecies,
    });
};
