import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_POST_QUERY_KEY = 'post';

const getPost = async (id: string) => {
    const { data } = await api.get(`/post/${id}`);
    return data;
};

export const getPostOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_POST_QUERY_KEY],
        queryFn: () => getPost(id),
    });

type UseGetPost = {
    queryConfig?: QueryConfig<typeof getPostOptions>;
    id: string;
};

export const useGetPost = ({ queryConfig, id }: UseGetPost) => {
    return useQuery({
        ...getPostOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
