import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_ALL_POSTS_QUERY_KEY = 'all-posts';

const getPosts = async () => {
    const { data } = await api.get(`/post`);
    return data;
};

export const getPostsOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_POSTS_QUERY_KEY],
        queryFn: () => getPosts(),
    });

type UseGetPosts = {
    queryConfig?: QueryConfig<typeof getPostsOptions>;
};

export const useGetPosts = ({ queryConfig }: UseGetPosts) => {
    return useQuery({
        ...getPostsOptions(),
        ...queryConfig,
    });
};
