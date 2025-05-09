import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Key dùng để cache dữ liệu của query gene family
export const GET_ALL_GENE_FAMILY_QUERY_KEY = 'gene_family_AL';

// Hàm gọi API để lấy danh sách gene family
const getGeneFamilys = async () => {
    const { data } = await api.get(`/gene-family`); // Gửi GET request đến /gene-family để lấy danh sách gene family
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query để lấy gene family
export const getPostGeneFamilysOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_GENE_FAMILY_QUERY_KEY], // Key dùng để cache dữ liệu của query gene family
        queryFn: () => getGeneFamilys(), // Chạy hàm getGeneFamilys để lấy dữ liệu
    });

// Kiểu dữ liệu cho custom hook useGetAllGeneFamily
type UseGetGeneFamilys = {
    queryConfig?: QueryConfig<typeof getPostGeneFamilysOptions>; // Tùy chọn cấu hình query
};

// Custom hook sử dụng useQuery để lấy tất cả gene family
export const useGetAllGeneFamily = ({ queryConfig }: UseGetGeneFamilys) => {
    return useQuery({
        ...getPostGeneFamilysOptions(), // Truyền cấu hình query lấy gene family
        ...queryConfig, // Gộp thêm cấu hình query nếu có
    });
};
