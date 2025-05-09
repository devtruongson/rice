import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Định nghĩa key dùng để cache và nhận diện query trong React Query
export const GET_STRAIN_QUERY_KEY = 'strain';

// Hàm gọi API để lấy chi tiết strain theo id
const getStrain = async (id: string) => {
    const { data } = await api.get(`/strain/${id}`); // Gửi GET request đến endpoint /strain/:id
    return data; // Trả về dữ liệu từ server
};

// Hàm trả về object cấu hình cho query, được sử dụng bởi useQuery
export const getStrainOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_STRAIN_QUERY_KEY, id],
        queryFn: () => getStrain(id),
    });

// Kiểu dữ liệu cho custom hook useGetStrain
type UseGetStrain = {
    queryConfig?: QueryConfig<typeof getStrainOptions>;
    id: string;
};

// Custom hook sử dụng useQuery để gọi API lấy thông tin strain theo id
export const useGetStrain = ({ queryConfig, id }: UseGetStrain) => {
    return useQuery({
        ...getStrainOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
