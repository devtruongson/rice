import { useMutation } from '@tanstack/react-query';
import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { StudyCreateType } from '../../type/study';

// Hàm gửi request POST đến endpoint /study với dữ liệu payload để tạo mới một Study
const createStudy = async (payload: StudyCreateType) => {
    const { data } = await api.post('/study', payload);
    return data; // Trả về dữ liệu phản hồi từ server
};

type CreateStudyCustomType = {
    mutationConfig?: MutationConfig<typeof createStudy>;
};

// Custom hook dùng để tạo mới Study thông qua useMutation
export const useCreateStudy = ({ mutationConfig }: CreateStudyCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createStudy, // Hàm thực thi khi mutation được gọi
    });
};
