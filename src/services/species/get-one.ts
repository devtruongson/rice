import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_SPECIES_QUERY_KEY = 'species';

const getSpecies = async (id: string) => {
    const { data } = await api.get(`/species/${id}`);
    return data;
};

export const getSpeciesOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_SPECIES_QUERY_KEY, id],
        queryFn: () => getSpecies(id),
    });

type UseGetSpecies = {
    queryConfig?: QueryConfig<typeof getSpeciesOptions>;
    id: string;
};

export const useGetSpeci = ({ queryConfig, id }: UseGetSpecies) => {
    return useQuery({
        ...getSpeciesOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
