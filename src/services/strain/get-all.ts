import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khóa định danh truy vấn để React Query nhận diện và cache dữ liệu
export const GET_ALL_STRAIN_QUERY_KEY = 'all-strain';

// Hàm gọi API để lấy danh sách tất cả các strain
const getStrains = async () => {
    const { data } = await api.get(`/strain`); // Gửi GET request đến endpoint /strain
    return data; // Trả về dữ liệu phản hồi từ server
};

export const getStrainsOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_STRAIN_QUERY_KEY],
        queryFn: () => getStrains(),
    });

// Kiểu dữ liệu cho custom hook useGetStrains
type UseGetStrains = {
    queryConfig?: QueryConfig<typeof getStrainsOptions>;
};

// Custom hook sử dụng useQuery để lấy danh sách strains
export const useGetStrains = ({ queryConfig }: UseGetStrains) => {
    return useQuery({
        ...getStrainsOptions(),
        ...queryConfig,
    });
};
