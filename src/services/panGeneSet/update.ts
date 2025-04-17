import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { PanGeneSetResType } from '../../type/panGeneSet';

const updatePanGeneSet = async (payload: PanGeneSetResType) => {
    const { data } = await api.patch('/pan-gene-set', payload);
    return data;
};

type UpdatePanGeneSetCustomType = {
    mutationConfig?: MutationConfig<typeof updatePanGeneSet>;
};

export const useUpdatePanGeneSet = ({ mutationConfig }: UpdatePanGeneSetCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updatePanGeneSet,
    });
};
