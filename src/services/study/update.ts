import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StudyResType } from '../../type/study';

const updateStudy = async (payload: StudyResType) => {
    const { data } = await api.patch('/study', payload);
    return data;
};

type UpdateStudyCustomType = {
    mutationConfig?: MutationConfig<typeof updateStudy>;
};

export const useUpdateStudy = ({ mutationConfig }: UpdateStudyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateStudy,
    });
};
