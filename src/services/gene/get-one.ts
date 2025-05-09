import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Key dùng để cache dữ liệu của query gene
export const GET_GENE_QUERY_KEY = 'gene';

// Hàm gọi API để lấy thông tin gene theo id
const getGene = async (id: string) => {
    const { data } = await api.get(`/gene/${id}`); // Gửi GET request đến /gene/:id để lấy thông tin gene
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query để lấy gene theo id
export const getGeneOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_GENE_QUERY_KEY, id], // Key bao gồm id gene để quản lý cache riêng biệt
        queryFn: () => getGene(id),
    });

// Kiểu dữ liệu cho custom hook useGetGene
type UseGetGene = {
    queryConfig?: QueryConfig<typeof getGeneOptions>;
    id: string;
};

// Custom hook sử dụng useQuery để lấy thông tin gene theo id
// `enabled` đảm bảo query chỉ chạy khi có id hợp lệ
export const useGetGene = ({ queryConfig, id }: UseGetGene) => {
    return useQuery({
        ...getGeneOptions(id), // Truyền id vào query để lấy dữ liệu gene
        ...queryConfig, // Gộp thêm cấu hình query nếu có
        enabled: Boolean(id), // Chỉ chạy query khi id tồn tại (không phải null hoặc undefined)
    });
};
