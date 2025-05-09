import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StudyUpdateType } from '../../type/study';

// Hàm gọi API PATCH để cập nhật thông tin Study
const updateStudy = async (payload: StudyUpdateType) => {
    const { data } = await api.patch('/study', payload); // Gửi PATCH request đến /study với payload
    return data; // Trả về dữ liệu phản hồi từ server
};

// Kiểu dữ liệu cho custom hook useUpdateStudy
type UpdateStudyCustomType = {
    mutationConfig?: MutationConfig<typeof updateStudy>;
};

// Custom hook sử dụng useMutation để cập nhật Study
export const useUpdateStudy = ({ mutationConfig }: UpdateStudyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateStudy,
    });
};
