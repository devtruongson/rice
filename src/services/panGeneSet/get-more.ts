import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_PAN_GENE_SET_MORE_QUERY_KEY = 'pan-gene-sets';

// Kiểu dữ liệu cho các tham số cần thiết khi gọi API lấy Pan Gene Sets
type PropsType = {
    type: string; // Loại Pan Gene Set (ví dụ: loại phân loại hoặc nhóm)
    page?: number; // Số trang, mặc định là 1 nếu không có
    pageSize?: number; // Số lượng bản ghi mỗi trang, mặc định là 10 nếu không có
};

// Hàm gọi API để lấy danh sách Pan Gene Sets với phân trang
const getPanGeneSets = async (rest: PropsType) => {
    const page = rest?.page || 1; // Nếu không có tham số page thì mặc định là 1
    const pageSize = rest?.pageSize || 10; // Nếu không có tham số pageSize thì mặc định là 10
    const { data } = await api.get(`/pan-gene-set/limit?page=${page}&pageSize=${pageSize}`); // Gửi GET request để lấy dữ liệu
    return data; // Trả về dữ liệu từ server
};

// Cấu hình cho useQuery khi gọi API lấy Pan Gene Sets
export const getPanGeneSetOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_PAN_GENE_SET_MORE_QUERY_KEY, rest], // Đặt key cho query và thêm tham số rest để phân biệt các truy vấn khác nhau
        queryFn: () => getPanGeneSets(rest), // Hàm gọi API để lấy dữ liệu
    });

type UseGetPanGeneSet = {
    queryConfig?: QueryConfig<typeof getPanGeneSetOptions>; // Cấu hình tùy chọn cho query nếu có
    rest: PropsType; // Các tham số truyền vào để xác định trang, kích thước trang, v.v.
};

// Custom hook sử dụng useQuery để lấy Pan Gene Sets với phân trang
export const useGetPanGeneSets = ({ queryConfig, rest }: UseGetPanGeneSet) => {
    return useQuery({
        ...getPanGeneSetOptions(rest), // Lấy cấu hình mặc định của query
        ...queryConfig, // Gộp thêm cấu hình từ bên ngoài nếu có
    });
};
