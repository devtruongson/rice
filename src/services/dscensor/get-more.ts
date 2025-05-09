import { queryOptions, useQuery } from '@tanstack/react-query';
import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';

// Khai báo một constant chứa key cho query này (sử dụng để cache dữ liệu của query)
export const GET_DSCENSOR_QUERY_KEY = 'Dscensors';

// Hàm gọi API để lấy danh sách Dscensors
const getDscensor = async () => {
    const { data } = await api.get(`/dscensor`); // Gửi GET request đến /dscensor để lấy dữ liệu
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query để lấy Dscensors
export const getGeneOptions = () =>
    queryOptions({
        queryKey: [GET_DSCENSOR_QUERY_KEY],
        queryFn: () => getDscensor(),
    });

// Kiểu dữ liệu cho custom hook useGetDscensor
type UseGetGene = {
    queryConfig?: QueryConfig<typeof getGeneOptions>;
};

// Custom hook sử dụng useQuery để lấy danh sách Dscensors
export const useGetDscensor = ({ queryConfig }: UseGetGene) => {
    return useQuery({
        ...getGeneOptions(),
        ...queryConfig,
    });
};
