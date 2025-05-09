import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StrainResType } from '../../type/strain';

// Hàm gọi API để cập nhật thông tin strain
const updateStrain = async (payload: StrainResType) => {
    const { data } = await api.patch('/strain', payload); // Gửi PATCH request đến /strain với payload
    return data; // Trả về dữ liệu phản hồi từ server sau khi cập nhật
};

// Kiểu dữ liệu cho custom hook useUpdateStrain
type UpdateStrainCustomType = {
    mutationConfig?: MutationConfig<typeof updateStrain>;
};

// Custom hook sử dụng useMutation để cập nhật thông tin strain
export const useUpdateStrain = ({ mutationConfig }: UpdateStrainCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateStrain,
    });
};
