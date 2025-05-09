import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_STUDY_QUERY_KEY = 'study';

// Hàm gọi API lấy chi tiết một Study theo ID
const getStudy = async (id: string) => {
    const { data } = await api.get(`/study/${id}`); // Gửi GET request đến /study/:id
    return data; // Trả về dữ liệu phản hồi từ server
};

// Tạo query options cho useQuery, gồm queryKey và queryFn
export const getStudyOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_STUDY_QUERY_KEY, id],
        queryFn: () => getStudy(id),
    });

type UseGetStudy = {
    queryConfig?: QueryConfig<typeof getStudyOptions>;
    id: string; // ID của Study cần lấy
};

// Custom hook sử dụng useQuery để lấy dữ liệu chi tiết một Study
export const useGetStudy = ({ queryConfig, id }: UseGetStudy) => {
    return useQuery({
        ...getStudyOptions(id),
        ...queryConfig,
        enabled: Boolean(id), // Chỉ fetch khi có ID hợp lệ
    });
};
