import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { UpdatePostType } from '../../type/post';

const updatePost = async (payload: UpdatePostType) => {
    const { data } = await api.patch('/post', payload);
    return data;
};

type UpdatePostCustomType = {
    mutationConfig?: MutationConfig<typeof updatePost>;
};

export const useUpdatePost = ({ mutationConfig }: UpdatePostCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updatePost,
    });
};
