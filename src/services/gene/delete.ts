import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';

// Hàm gọi API để xóa một gene theo id
const deleteGene = async (id: string) => {
    const { data } = await api.delete(`/gene/${id}`); // Gửi DELETE request đến /gene/:id để xóa gene
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useDeleteGene
type DeleteGeneType = {
    mutationConfig?: MutationConfig<typeof deleteGene>;
};

// Custom hook sử dụng useMutation để thực hiện mutation xóa gene
export const useDeleteGene = ({ mutationConfig }: DeleteGeneType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation nếu có
        mutationFn: deleteGene, // Hàm thực hiện mutation
    });
};
