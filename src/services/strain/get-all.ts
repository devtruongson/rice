import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_ALL_STRAIN_QUERY_KEY = 'all-strain';

const getStrains = async () => {
    const { data } = await api.get(`/strain`);
    return data;
};

export const getStrainsOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_STRAIN_QUERY_KEY],
        queryFn: () => getStrains(),
    });

type UseGetStrains = {
    queryConfig?: QueryConfig<typeof getStrainsOptions>;
};

export const useGetStrains = ({ queryConfig }: UseGetStrains) => {
    return useQuery({
        ...getStrainsOptions(),
        ...queryConfig,
    });
};
