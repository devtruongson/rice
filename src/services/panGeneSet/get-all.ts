import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_ALL_PAN_GENE_SET_QUERY_KEY = 'all_pan-gene-set';

const getPanGeneSets = async () => {
    const { data } = await api.get(`/pan-gene-set/all`);
    return data;
};

export const getPanGeneSetOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_PAN_GENE_SET_QUERY_KEY],
        queryFn: () => getPanGeneSets(),
    });

type UseGetPanGeneSet = {
    queryConfig?: QueryConfig<typeof getPanGeneSetOptions>;
};

export const useGetAllPanGeneSet = ({ queryConfig }: UseGetPanGeneSet) => {
    return useQuery({
        ...getPanGeneSetOptions(),
        ...queryConfig,
    });
};
