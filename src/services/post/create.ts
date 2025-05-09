import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { CreatePostType } from '../../type/post';

// Hàm gọi API để tạo bài viết mới
const createPost = async (payload: CreatePostType) => {
    const { data } = await api.post('/post', payload); // Gửi POST request với dữ liệu payload
    return data; // Trả về dữ liệu bài viết mới từ API
};

// Kiểu dữ liệu cho custom hook useCreatePost
type CreatePostCustomType = {
    mutationConfig?: MutationConfig<typeof createPost>; // Cấu hình mutation nếu có
};

// Custom hook sử dụng useMutation để thực hiện mutation tạo bài viết mới
export const useCreatePost = ({ mutationConfig }: CreatePostCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation vào
        mutationFn: createPost, // Chỉ định hàm thực thi mutation (createPost)
    });
};
