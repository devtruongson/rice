import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Key dùng để cache dữ liệu của query danh sách genes
export const GET_GENES_QUERY_KEY = 'genes';

// Hàm gọi API để lấy danh sách genes theo tên (danh sách tên truyền dưới dạng chuỗi ngăn cách bởi xuống dòng)
const getListGene = async (names: string) => {
    // Tách chuỗi thành mảng tên, loại bỏ khoảng trắng và dòng trống
    const list = names
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);

    // Tạo query string từ danh sách tên
    const query = list.map((item) => `names=${item}`).join('&');

    // Gửi GET request đến /gene/list với danh sách tên
    const { data } = await api.get(`/gene/list?${query}`);
    return data; // Trả về dữ liệu từ server
};

// Hàm cấu hình tùy chọn cho query để lấy danh sách genes theo tên
export const getListGeneOptions = (names: string) =>
    queryOptions({
        queryKey: [GET_GENES_QUERY_KEY], // Key dùng để cache dữ liệu
        queryFn: () => getListGene(names),
    });

// Kiểu dữ liệu cho custom hook useGetListGene
type UseGetListGeneType = {
    queryConfig?: QueryConfig<typeof getListGeneOptions>;
    names: string;
    enabled: boolean; // Cho phép bật/tắt query
};

// Custom hook sử dụng useQuery để lấy danh sách gene theo tên (có thể bật/tắt bằng `enabled`)
export const useGetListGene = ({ queryConfig, names, enabled }: UseGetListGeneType) => {
    return useQuery({
        ...getListGeneOptions(names), // Gọi query với danh sách tên
        ...queryConfig, // Gộp thêm cấu hình query nếu có
        enabled: enabled, // Kiểm soát việc có chạy query hay không
    });
};
