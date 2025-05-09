import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Key dùng để cache dữ liệu của query gene family
export const GET_GENE_FAMILY_QUERY_KEY = 'gene_family';

// Hàm gọi API để lấy thông tin gene family bằng ID
const getGeneFamily = async (id: string) => {
    const { data } = await api.get(`/gene-family/${id}`); // Gửi GET request đến API với ID gene family
    return data; // Trả về dữ liệu gene family từ server
};

// Hàm cấu hình tùy chọn cho query lấy gene family
export const getGeneFamilyOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_GENE_FAMILY_QUERY_KEY], // Key cho query (chỉ có gene family này)
        queryFn: () => getGeneFamily(id), // Hàm gọi API lấy dữ liệu gene family
    });

// Kiểu dữ liệu cho custom hook useGetGeneFamily
type UseGetGeneFamily = {
    queryConfig?: QueryConfig<typeof getGeneFamilyOptions>; // Cấu hình query nếu có
    id: string; // ID của gene family cần lấy thông tin
};

// Custom hook sử dụng useQuery để lấy thông tin gene family
export const useGetGeneFamily = ({ queryConfig, id }: UseGetGeneFamily) => {
    return useQuery({
        ...getGeneFamilyOptions(id), // Truyền tùy chọn cấu hình lấy dữ liệu gene family
        ...queryConfig, // Gộp thêm cấu hình query nếu có
        enabled: Boolean(id), // Chỉ chạy query khi ID hợp lệ
    });
};
