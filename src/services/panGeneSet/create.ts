import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { PanGeneSetCreateType } from '../../type/panGeneSet';

// Hàm gọi API để tạo mới Pan Gene Set
const createPanGeneSet = async (payload: PanGeneSetCreateType) => {
    const { data } = await api.post('/pan-gene-set', payload); // Gửi POST request đến server để tạo Pan Gene Set mới
    return data; // Trả về dữ liệu phản hồi từ server sau khi tạo thành công
};

// Kiểu dữ liệu cho custom hook useCreatePanGeneSet
type CreatePanGeneSetCustomType = {
    mutationConfig?: MutationConfig<typeof createPanGeneSet>; // Cấu hình tuỳ chọn cho mutation nếu cần
};

// Custom hook sử dụng useMutation để thực hiện mutation tạo Pan Gene Set
export const useCreatePanGeneSet = ({ mutationConfig }: CreatePanGeneSetCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation nếu có vào
        mutationFn: createPanGeneSet, // Chỉ định hàm thực thi mutation là createPanGeneSet
    });
};
