import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_POSTS_QUERY_KEY = 'posts';

const getPosts = async (type: string) => {
    const { data } = await api.get(`/post/type/${type}`);
    return data;
};

export const getPostByTypeOptions = (type: string) =>
    queryOptions({
        queryKey: [GET_POSTS_QUERY_KEY, type],
        queryFn: () => getPosts(type),
    });

type UseGetPostByType = {
    queryConfig?: QueryConfig<typeof getPostByTypeOptions>;
    type: string;
};

export const useGetPostByType = ({ queryConfig, type }: UseGetPostByType) => {
    return useQuery({
        ...getPostByTypeOptions(type),
        ...queryConfig,
    });
};
