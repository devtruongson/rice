import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khai báo một constant chứa key cho query này (sử dụng để cache dữ liệu của query)
export const GET_SPECIES_QUERY_KEY = 'species';

// Hàm gọi API để lấy thông tin về species theo id
const getSpecies = async (id: string) => {
    const { data } = await api.get(`/species/${id}`); // Gửi GET request đến /species/:id để lấy thông tin species
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query để lấy species theo id
export const getSpeciesOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_SPECIES_QUERY_KEY, id],
        queryFn: () => getSpecies(id),
    });

// Kiểu dữ liệu cho custom hook useGetSpecies
type UseGetSpecies = {
    queryConfig?: QueryConfig<typeof getSpeciesOptions>;
    id: string;
};

// Custom hook sử dụng useQuery để lấy thông tin về species theo id
export const useGetSpeci = ({ queryConfig, id }: UseGetSpecies) => {
    return useQuery({
        ...getSpeciesOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
