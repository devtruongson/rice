import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_STUDYS_QUERY_KEY = 'studies';

// Kiểu cho các tham số lọc khi gọi API danh sách Study
type PropsType = {
    page?: number;
    pageSize?: number;
    species?: string;
    study_type?: string;
    traits?: string;
    publication_id?: string;
    author?: string;
};

// Hàm gọi API lấy danh sách Study với các tham số lọc (query string)
const getStudies = async (rest: PropsType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
        page: rest.page || 1, // Mặc định trang 1 nếu không có
        pageSize: rest.pageSize || 10, // Mặc định 10 bản ghi mỗi trang
    };
    // Gắn các tham số lọc nếu có
    if (rest.species) params.species = rest.species;
    if (rest.study_type) params.study_type = rest.study_type;
    if (rest.traits) params.traits = rest.traits;
    if (rest.publication_id) params.publication_id = rest.publication_id;
    if (rest.author) params.author = rest.author;

    // Chuyển object params thành query string
    const query = new URLSearchParams(params).toString();
    // Gửi request GET tới endpoint /study với query string
    const { data } = await api.get(`/study?${query}`);
    return data; // Trả về dữ liệu từ server
};

export const getStudieOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_STUDYS_QUERY_KEY, rest],
        queryFn: () => getStudies(rest),
    });

// Kiểu dữ liệu cho hook useGetStudies
type UseGetStudie = {
    queryConfig?: QueryConfig<typeof getStudieOptions>;
    rest: PropsType;
};

// Custom hook sử dụng useQuery để lấy danh sách Study
export const useGetStudies = ({ queryConfig, rest }: UseGetStudie) => {
    return useQuery({
        ...getStudieOptions(rest),
        ...queryConfig,
    });
};
