import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Key dùng để cache dữ liệu của query gene family
export const GET_GENE_FAMILY_QUERY_KEY = 'gene_familys';

// Kiểu dữ liệu cho các tham số đầu vào của hàm lấy danh sách gene family
type PropsType = {
    page?: number; // Số trang, mặc định là 1
    pageSize?: number; // Số lượng gene family mỗi trang, mặc định là 10
};

// Hàm gọi API để lấy danh sách gene family với phân trang
const getGeneFamilys = async (rest: PropsType) => {
    const page = rest?.page || 1; // Nếu không có tham số page thì mặc định là 1
    const pageSize = rest?.pageSize || 10; // Nếu không có tham số pageSize thì mặc định là 10
    const { data } = await api.get(`/gene-family/limit?page=${page}&pageSize=${pageSize}`); // Gửi GET request đến API
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query lấy gene family với phân trang
export const getPostGeneFamilysOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_GENE_FAMILY_QUERY_KEY, rest], // Key cho query và tham số phân trang
        queryFn: () => getGeneFamilys(rest), // Gọi hàm getGeneFamilys để lấy dữ liệu
    });

// Kiểu dữ liệu cho custom hook useGetGeneFamilys
type UseGetGeneFamilys = {
    queryConfig?: QueryConfig<typeof getPostGeneFamilysOptions>; // Tùy chọn cấu hình query
    rest: PropsType; // Tham số phân trang
};

// Custom hook sử dụng useQuery để lấy danh sách gene family với phân trang
export const useGetGeneFamilys = ({ queryConfig, rest }: UseGetGeneFamilys) => {
    return useQuery({
        ...getPostGeneFamilysOptions(rest), // Truyền cấu hình query lấy gene family với tham số phân trang
        ...queryConfig, // Gộp thêm cấu hình query nếu có
    });
};
