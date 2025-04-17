import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneFamilyResType } from '../../type/geneFamily';

const updateGeneFamily = async (payload: GeneFamilyResType) => {
    const { data } = await api.patch('/gene-family', payload);
    return data;
};

type UpdateGeneFamilyCustomType = {
    mutationConfig?: MutationConfig<typeof updateGeneFamily>;
};

export const useUpdateGeneFamily = ({ mutationConfig }: UpdateGeneFamilyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateGeneFamily,
    });
};
