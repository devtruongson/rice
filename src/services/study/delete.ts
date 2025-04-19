import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';

const deleteStudy = async (id: string) => {
    const { data } = await api.delete(`/study/${id}`);
    return data;
};

type DeleteStudyCustomType = {
    mutationConfig?: MutationConfig<typeof deleteStudy>;
};

export const useDeleteStudy = ({ mutationConfig }: DeleteStudyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteStudy,
    });
};
