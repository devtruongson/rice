import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_ALL_PAN_GENE_SET_QUERY_KEY = 'all_pan-gene-set';

// Hàm gọi API để lấy tất cả Pan Gene Sets
const getPanGeneSets = async () => {
    const { data } = await api.get(`/pan-gene-set/all`); // Gửi GET request để lấy tất cả Pan Gene Sets
    return data; // Trả về dữ liệu phản hồi từ server
};

// Tùy chọn cấu hình cho useQuery khi lấy tất cả Pan Gene Sets
export const getPanGeneSetOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_PAN_GENE_SET_QUERY_KEY], // Đặt key cho query là 'all_pan-gene-set'
        queryFn: () => getPanGeneSets(), // Chỉ định hàm gọi API để lấy dữ liệu
    });

type UseGetPanGeneSet = {
    queryConfig?: QueryConfig<typeof getPanGeneSetOptions>; // Cấu hình tùy chọn cho query nếu có
};

// Custom hook sử dụng useQuery để lấy tất cả Pan Gene Sets
export const useGetAllPanGeneSet = ({ queryConfig }: UseGetPanGeneSet) => {
    return useQuery({
        ...getPanGeneSetOptions(), // Lấy cấu hình mặc định của query
        ...queryConfig, // Gộp thêm cấu hình từ bên ngoài nếu có
    });
};
