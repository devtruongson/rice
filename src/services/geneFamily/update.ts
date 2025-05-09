import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { GeneFamilyResType } from '../../type/geneFamily';

// Hàm gọi API để cập nhật thông tin gene family
const updateGeneFamily = async (payload: GeneFamilyResType) => {
    const { data } = await api.patch('/gene-family', payload); // Gửi PATCH request để cập nhật gene family
    return data; // Trả về dữ liệu cập nhật từ server
};

// Kiểu dữ liệu cho custom hook useUpdateGeneFamily
type UpdateGeneFamilyCustomType = {
    mutationConfig?: MutationConfig<typeof updateGeneFamily>; // Cấu hình mutation nếu có
};

// Custom hook sử dụng useMutation để thực hiện mutation cập nhật gene family
export const useUpdateGeneFamily = ({ mutationConfig }: UpdateGeneFamilyCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation vào
        mutationFn: updateGeneFamily, // Chỉ định hàm thực thi mutation (updateGeneFamily)
    });
};
