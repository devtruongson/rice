import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { SpeciesCreateType } from '../../type/species';

// Hàm gọi API để tạo mới một species
const createSpecies = async (payload: SpeciesCreateType) => {
    const { data } = await api.post('/species', payload); // Gửi POST request đến /species với payload
    return data; // Trả về dữ liệu phản hồi từ server sau khi tạo species
};

// Kiểu dữ liệu cho custom hook useCreateSpecies
type CreateSpeciesCustomType = {
    mutationConfig?: MutationConfig<typeof createSpecies>;
};

// Custom hook sử dụng useMutation để tạo mới species
export const useCreateSpecies = ({ mutationConfig }: CreateSpeciesCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createSpecies,
    });
};
