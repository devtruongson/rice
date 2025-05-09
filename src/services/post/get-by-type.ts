import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khóa query để lấy bài viết theo loại
export const GET_POSTS_QUERY_KEY = 'posts';

// Kiểu dữ liệu cho các tham số truyền vào hàm lấy bài viết
type PropsType = {
    type: string; // Loại bài viết (ví dụ: 'news', 'blog'...)
    page?: number; // Số trang, mặc định là 1
    pageSize?: number; // Số lượng bài viết mỗi trang, mặc định là 10
};

// Hàm gọi API để lấy bài viết theo loại
const getPosts = async (rest: PropsType) => {
    const page = rest?.page || 1; // Nếu không có giá trị page, mặc định là 1
    const pageSize = rest?.pageSize || 10; // Nếu không có giá trị pageSize, mặc định là 10
    const { data } = await api.get(`/post/type?type=${rest.type}&page=${page}&pageSize=${pageSize}`); // Gửi GET request với các tham số
    return data; // Trả về dữ liệu bài viết từ API
};

// Cấu hình query options cho việc lấy bài viết theo loại
export const getPostByTypeOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_POSTS_QUERY_KEY, rest], // Sử dụng queryKey để phân biệt và cache kết quả
        queryFn: () => getPosts(rest), // Chỉ định hàm gọi API để lấy bài viết
    });

// Kiểu dữ liệu cho custom hook useGetPostByType
type UseGetPostByType = {
    queryConfig?: QueryConfig<typeof getPostByTypeOptions>; // Cấu hình query tùy chọn nếu có
    rest: PropsType; // Tham số truyền vào (loại bài viết, trang, số lượng)
};

// Custom hook sử dụng useQuery để lấy bài viết theo loại
export const useGetPostByType = ({ queryConfig, rest }: UseGetPostByType) => {
    return useQuery({
        ...getPostByTypeOptions(rest), // Cấu hình query options mặc định
        ...queryConfig, // Gộp thêm các cấu hình query từ ngoài nếu có
    });
};
