import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_PAN_GENE_SET_QUERY_KEY = 'pan-gene-set';

// Hàm gọi API để lấy chi tiết Pan Gene Set theo ID
const getPanGeneSet = async (id: string) => {
    const { data } = await api.get(`/pan-gene-set/${id}`); // Gửi GET request với ID của Pan Gene Set
    return data; // Trả về dữ liệu chi tiết của Pan Gene Set
};

// Cấu hình cho useQuery khi gọi API lấy chi tiết Pan Gene Set
export const getPanGeneSetOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_PAN_GENE_SET_QUERY_KEY, id], // Đặt key cho query với ID để xác định duy nhất
        queryFn: () => getPanGeneSet(id), // Hàm gọi API để lấy dữ liệu chi tiết Pan Gene Set
    });

type UseGetPanGeneSet = {
    queryConfig?: QueryConfig<typeof getPanGeneSetOptions>; // Cấu hình tùy chọn cho query nếu có
    id: string; // ID của Pan Gene Set cần lấy
};

// Custom hook sử dụng useQuery để lấy chi tiết Pan Gene Set
export const useGetPanGeneSet = ({ queryConfig, id }: UseGetPanGeneSet) => {
    return useQuery({
        ...getPanGeneSetOptions(id), // Lấy cấu hình mặc định của query
        ...queryConfig, // Gộp thêm cấu hình từ bên ngoài nếu có
        enabled: Boolean(id), // Chỉ kích hoạt query nếu có ID (tránh lỗi khi ID không hợp lệ)
    });
};
