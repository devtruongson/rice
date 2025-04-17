import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_STRAIN_QUERY_KEY = 'strain';

const getStrain = async (id: string) => {
    const { data } = await api.get(`/strain/${id}`);
    return data;
};

export const getStrainOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_STRAIN_QUERY_KEY, id],
        queryFn: () => getStrain(id),
    });

type UseGetStrain = {
    queryConfig?: QueryConfig<typeof getStrainOptions>;
    id: string;
};

export const useGetStrain = ({ queryConfig, id }: UseGetStrain) => {
    return useQuery({
        ...getStrainOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
