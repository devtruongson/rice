import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';

// Hàm gửi request DELETE để xóa một Study theo id
const deleteStudy = async (id: string) => {
    const { data } = await api.delete(`/study/${id}`); // Gửi request DELETE tới /study/:id
    return data; // Trả về dữ liệu phản hồi từ server (nếu có)
};

type DeleteStudyCustomType = {
    mutationConfig?: MutationConfig<typeof deleteStudy>;
};

// Custom hook để xóa Study bằng React Query useMutation
export const useDeleteStudy = ({ mutationConfig }: DeleteStudyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteStudy, // Hàm sẽ được gọi khi thực hiện mutation
    });
};
