import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StrainCreateType } from '../../type/strain';

const createStrain = async (payload: StrainCreateType) => {
    const { data } = await api.post('/strain', payload);
    return data;
};

type CreateStrainCustomType = {
    mutationConfig?: MutationConfig<typeof createStrain>;
};

export const useCreateStrain = ({ mutationConfig }: CreateStrainCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createStrain,
    });
};
