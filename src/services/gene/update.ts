import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneUpdateType } from '../../type/gene';

// Hàm gọi API để cập nhật thông tin gene
const updateGene = async (payload: GeneUpdateType) => {
    const { data } = await api.patch('/gene', payload); // Gửi PATCH request đến /gene để cập nhật dữ liệu gene
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useUpdateGene
type UpdateGeneCustomType = {
    mutationConfig?: MutationConfig<typeof updateGene>; // Tùy chọn cấu hình cho mutation
};

// Custom hook sử dụng useMutation để cập nhật thông tin gene
export const useUpdateGene = ({ mutationConfig }: UpdateGeneCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp thêm cấu hình mutation nếu có
        mutationFn: updateGene, // Gọi hàm updateGene khi mutation thực thi
    });
};
