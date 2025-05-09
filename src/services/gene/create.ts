import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneCreateType } from '../../type/gene';

// Hàm gọi API để tạo mới một gene
const createGene = async (payload: GeneCreateType) => {
    const { data } = await api.post('/gene', payload); // Gửi POST request đến /gene với dữ liệu payload
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useCreateGene
type CreateGeneCustomType = {
    mutationConfig?: MutationConfig<typeof createGene>;
};

// Custom hook sử dụng useMutation để thực hiện mutation tạo gene
export const useCreateGene = ({ mutationConfig }: CreateGeneCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation nếu có
        mutationFn: createGene, // Hàm thực hiện mutation
    });
};
