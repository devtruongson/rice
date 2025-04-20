import { queryOptions, useQuery } from '@tanstack/react-query';
import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';

export const GET_DSCENSOR_QUERY_KEY = 'Dscensors';

const getDscensor = async () => {
    const { data } = await api.get(`/dscensor`);
    return data;
};

export const getGeneOptions = () =>
    queryOptions({
        queryKey: [GET_DSCENSOR_QUERY_KEY],
        queryFn: () => getDscensor(),
    });

type UseGetGene = {
    queryConfig?: QueryConfig<typeof getGeneOptions>;
};

export const useGetDscensor = ({ queryConfig }: UseGetGene) => {
    return useQuery({
        ...getGeneOptions(),
        ...queryConfig,
    });
};
