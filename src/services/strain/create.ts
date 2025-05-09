import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StrainCreateType } from '../../type/strain';

// Hàm gọi API để tạo mới một Strain
const createStrain = async (payload: StrainCreateType) => {
    const { data } = await api.post('/strain', payload); // Gửi POST request đến /strain với payload
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useCreateStrain
type CreateStrainCustomType = {
    mutationConfig?: MutationConfig<typeof createStrain>;
};

// Custom hook sử dụng useMutation để tạo mới Strain
export const useCreateStrain = ({ mutationConfig }: CreateStrainCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createStrain,
    });
};
