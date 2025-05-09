import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';

// Hàm gọi API để xóa species theo id
const deleteSpecies = async (id: string) => {
    const { data } = await api.delete(`/species/${id}`); // Gửi DELETE request đến /species/:id để xóa species
    return data; // Trả về dữ liệu phản hồi từ server sau khi xóa
};

// Kiểu dữ liệu cho custom hook useDeleteSpecies
type DeleteSpeciesCustomType = {
    mutationConfig?: MutationConfig<typeof deleteSpecies>;
};

// Custom hook sử dụng useMutation để xóa species
export const useDeleteSpecies = ({ mutationConfig }: DeleteSpeciesCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteSpecies,
    });
};
