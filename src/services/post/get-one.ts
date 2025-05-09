import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

// Khóa query để lấy thông tin bài viết
export const GET_POST_QUERY_KEY = 'post';

// Hàm gọi API để lấy thông tin một bài viết theo id
const getPost = async (id: string) => {
    const { data } = await api.get(`/post/${id}`); // Gửi GET request để lấy thông tin bài viết theo id
    return data; // Trả về dữ liệu bài viết từ API
};

// Cấu hình query options cho việc lấy bài viết theo id
export const getPostOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_POST_QUERY_KEY, id], // Sử dụng queryKey để phân biệt và cache kết quả (bao gồm id bài viết)
        queryFn: () => getPost(id), // Chỉ định hàm gọi API để lấy bài viết theo id
    });

// Kiểu dữ liệu cho custom hook useGetPost
type UseGetPost = {
    queryConfig?: QueryConfig<typeof getPostOptions>; // Cấu hình query tùy chọn nếu có
    id: string; // id của bài viết cần lấy
};

// Custom hook sử dụng useQuery để lấy thông tin bài viết
export const useGetPost = ({ queryConfig, id }: UseGetPost) => {
    return useQuery({
        ...getPostOptions(id), // Cấu hình query options mặc định cho id bài viết
        ...queryConfig, // Gộp thêm các cấu hình query từ ngoài nếu có
        enabled: Boolean(id), // Chỉ kích hoạt query khi id hợp lệ (không phải null hay undefined)
    });
};
