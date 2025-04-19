import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StudyCreateType } from '../../type/study';

const createStudy = async (payload: StudyCreateType) => {
    const { data } = await api.post('/study', payload);
    return data;
};

type CreateStudyCustomType = {
    mutationConfig?: MutationConfig<typeof createStudy>;
};

export const useCreateStudy = ({ mutationConfig }: CreateStudyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createStudy,
    });
};
