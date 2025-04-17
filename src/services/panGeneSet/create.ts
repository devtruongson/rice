import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { PanGeneSetCreateType } from '../../type/panGeneSet';

const createPanGeneSet = async (payload: PanGeneSetCreateType) => {
    const { data } = await api.post('/pan-gene-set', payload);
    return data;
};

type CreatePanGeneSetCustomType = {
    mutationConfig?: MutationConfig<typeof createPanGeneSet>;
};

export const useCreatePanGeneSet = ({ mutationConfig }: CreatePanGeneSetCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createPanGeneSet,
    });
};
