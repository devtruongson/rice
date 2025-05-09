import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { SpeciesResType } from '../../type/species';

// Hàm thực hiện update species trên server thông qua API PATCH request
const updateSpecies = async (payload: SpeciesResType) => {
    const { data } = await api.patch('/species', payload); // Gửi yêu cầu PATCH tới API với payload species
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useUpdateSpecies, có thể nhận thêm cấu hình tùy chọn
type UpdateSpeciesCustomType = {
    mutationConfig?: MutationConfig<typeof updateSpecies>;
};

// Custom hook sử dụng useMutation để thực hiện mutation cập nhật species
export const useUpdateSpecies = ({ mutationConfig }: UpdateSpeciesCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateSpecies,
    });
};
