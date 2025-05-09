import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khai báo một constant chứa key cho query này (sử dụng để cache dữ liệu của query)
export const GET_ALL_SPECIES_QUERY_KEY = 'all-species';

// Hàm gọi API để lấy danh sách tất cả species
const getSpecies = async () => {
    const { data } = await api.get(`/species`); // Gửi GET request đến /species để lấy danh sách species
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query để lấy species
export const getSpeciesOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_SPECIES_QUERY_KEY],
        queryFn: () => getSpecies(),
    });

// Kiểu dữ liệu cho custom hook useGetSpecies
type UseGetSpecies = {
    queryConfig?: QueryConfig<typeof getSpeciesOptions>;
};

// Custom hook sử dụng useQuery để lấy danh sách species
export const useGetSpecies = ({ queryConfig }: UseGetSpecies) => {
    return useQuery({
        ...getSpeciesOptions(),
        ...queryConfig,
    });
};
