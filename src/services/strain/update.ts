import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StrainResType } from '../../type/strain';

const updateStrain = async (payload: StrainResType) => {
    const { data } = await api.patch('/strain', payload);
    return data;
};

type UpdateStrainCustomType = {
    mutationConfig?: MutationConfig<typeof updateStrain>;
};

export const useUpdateStrain = ({ mutationConfig }: UpdateStrainCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateStrain,
    });
};
