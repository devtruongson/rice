import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_ALL_SPECIES_QUERY_KEY = 'all-species';

const getSpecies = async () => {
    const { data } = await api.get(`/species`);
    return data;
};

export const getSpeciesOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_SPECIES_QUERY_KEY],
        queryFn: () => getSpecies(),
    });

type UseGetSpecies = {
    queryConfig?: QueryConfig<typeof getSpeciesOptions>;
};

export const useGetSpecies = ({ queryConfig }: UseGetSpecies) => {
    return useQuery({
        ...getSpeciesOptions(),
        ...queryConfig,
    });
};
