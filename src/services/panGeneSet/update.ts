import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { PanGeneSetResType } from '../../type/panGeneSet';

// Hàm gọi API để cập nhật Pan Gene Set
const updatePanGeneSet = async (payload: PanGeneSetResType) => {
    const { data } = await api.patch('/pan-gene-set', payload); // Gửi PATCH request với dữ liệu payload
    return data; // Trả về dữ liệu đã được cập nhật từ API
};

// Kiểu dữ liệu cho custom hook useUpdatePanGeneSet
type UpdatePanGeneSetCustomType = {
    mutationConfig?: MutationConfig<typeof updatePanGeneSet>; // Cấu hình mutation nếu có
};

// Custom hook sử dụng useMutation để thực hiện mutation cập nhật Pan Gene Set
export const useUpdatePanGeneSet = ({ mutationConfig }: UpdatePanGeneSetCustomType) => {
    return useMutation({
        ...mutationConfig, // Gộp cấu hình mutation vào
        mutationFn: updatePanGeneSet, // Chỉ định hàm thực thi mutation (updatePanGeneSet)
    });
};
