import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { UpdatePostType } from '../../type/post';

// Hàm gọi API để cập nhật thông tin bài viết
const updatePost = async (payload: UpdatePostType) => {
    const { data } = await api.patch('/post', payload); // Gửi PATCH request để cập nhật bài viết
    return data; // Trả về dữ liệu bài viết đã được cập nhật từ server
};

// Kiểu dữ liệu cho custom hook useUpdatePost
type UpdatePostCustomType = {
    mutationConfig?: MutationConfig<typeof updatePost>; // Cấu hình mutation nếu có
};

// Custom hook sử dụng useMutation để thực hiện mutation cập nhật bài viết
export const useUpdatePost = ({ mutationConfig }: UpdatePostCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation vào
        mutationFn: updatePost, // Chỉ định hàm thực thi mutation (updatePost)
    });
};
