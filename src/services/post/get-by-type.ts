import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_POSTS_QUERY_KEY = 'posts';

type PropsType = {
    type: string;
    page?: number;
    pageSize?: number;
};

const getPosts = async (rest: PropsType) => {
    const page = rest?.page || 1;
    const pageSize = rest?.pageSize || 10;
    const { data } = await api.get(`/post/type?type=${rest.type}&page=${page}&pageSize=${pageSize}`);
    return data;
};

export const getPostByTypeOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_POSTS_QUERY_KEY, rest],
        queryFn: () => getPosts(rest),
    });

type UseGetPostByType = {
    queryConfig?: QueryConfig<typeof getPostByTypeOptions>;
    rest: PropsType;
};

export const useGetPostByType = ({ queryConfig, rest }: UseGetPostByType) => {
    return useQuery({
        ...getPostByTypeOptions(rest),
        ...queryConfig,
    });
};
