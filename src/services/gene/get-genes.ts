import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khai báo một constant chứa key cho query danh sách genes
export const GET_GENES_QUERY_KEY = 'genes';

// Kiểu dữ liệu cho các tham số lọc khi lấy danh sách genes
type PropsType = {
    textSearch?: string;
    page?: number;
    pageSize?: number;
    species?: string;
    strain?: string;
    identifier?: string;
    description?: string;
    gene_family?: string;
};

// Hàm gọi API để lấy danh sách genes có hỗ trợ các bộ lọc
const getGenes = async (rest: PropsType) => {
    // Tạo đối tượng params với giá trị mặc định cho phân trang
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
        page: rest.page || 1,
        pageSize: rest.pageSize || 10,
    };

    // Thêm các tham số lọc nếu có
    if (rest.textSearch) params.textSearch = rest.textSearch;
    if (rest.species) params.species = rest.species;
    if (rest.strain) params.strain = rest.strain;
    if (rest.identifier) params.identifier = rest.identifier;
    if (rest.description) params.description = rest.description;
    if (rest.gene_family) params.gene_family = rest.gene_family;

    // Chuyển đổi params thành query string và gọi API
    const query = new URLSearchParams(params).toString();
    const { data } = await api.get(`/gene?${query}`); // Gửi GET request đến /gene với các tham số lọc
    return data; // Trả về dữ liệu phản hồi từ server
};

// Hàm cấu hình tùy chọn cho query để lấy danh sách genes
export const getGeneOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_GENES_QUERY_KEY, rest], // Key bao gồm cả điều kiện lọc để quản lý cache riêng biệt
        queryFn: () => getGenes(rest),
    });

// Kiểu dữ liệu cho custom hook useGetGenes
type UseGetGene = {
    queryConfig?: QueryConfig<typeof getGeneOptions>;
    rest: PropsType;
};

// Custom hook sử dụng useQuery để lấy danh sách genes có lọc
export const useGetGenes = ({ queryConfig, rest }: UseGetGene) => {
    return useQuery({
        ...getGeneOptions(rest), // Truyền các tham số lọc vào query
        ...queryConfig, // Gộp thêm cấu hình nếu có
    });
};
