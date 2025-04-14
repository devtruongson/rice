import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { CreatePostType } from '../../type/post';

const createPost = async (payload: CreatePostType) => {
    const { data } = await api.post('/post', payload);
    return data;
};

type CreatePostCustomType = {
    mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ mutationConfig }: CreatePostCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createPost,
    });
};
