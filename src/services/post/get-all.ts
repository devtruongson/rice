import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khóa query để lấy tất cả các bài viết
export const GET_ALL_POSTS_QUERY_KEY = 'all-posts';

// Hàm gọi API để lấy danh sách bài viết
const getPosts = async () => {
    const { data } = await api.get(`/post`); // Gửi GET request để lấy danh sách bài viết
    return data; // Trả về dữ liệu bài viết từ API
};

// Cấu hình query options cho việc lấy bài viết
export const getPostsOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_POSTS_QUERY_KEY], // Sử dụng queryKey để phân biệt và cache kết quả
        queryFn: () => getPosts(), // Chỉ định hàm gọi API để lấy bài viết
    });

// Kiểu dữ liệu cho custom hook useGetPosts
type UseGetPosts = {
    queryConfig?: QueryConfig<typeof getPostsOptions>; // Cấu hình query tùy chọn nếu có
};

// Custom hook sử dụng useQuery để lấy tất cả các bài viết
export const useGetPosts = ({ queryConfig }: UseGetPosts) => {
    return useQuery({
        ...getPostsOptions(), // Cấu hình query options mặc định
        ...queryConfig, // Gộp thêm các cấu hình query từ ngoài nếu có
    });
};
