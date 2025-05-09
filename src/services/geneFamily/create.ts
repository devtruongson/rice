import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneFamilyCreateType } from '../../type/geneFamily';

// Hàm gọi API để tạo mới gene family
const createGeneFamily = async (payload: GeneFamilyCreateType) => {
    const { data } = await api.post('/gene-family', payload); // Gửi POST request đến /gene-family để tạo gene family mới
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useCreateGeneFamily
type CreateGeneFamilyCustomType = {
    mutationConfig?: MutationConfig<typeof createGeneFamily>; // Tùy chọn cấu hình cho mutation
};

// Custom hook sử dụng useMutation để tạo gene family mới
export const useCreateGeneFamily = ({ mutationConfig }: CreateGeneFamilyCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp thêm cấu hình mutation nếu có
        mutationFn: createGeneFamily, // Gọi hàm createGeneFamily khi mutation thực thi
    });
};
