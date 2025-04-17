import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_PAN_GENE_SET_QUERY_KEY = 'pan-gene-set';

const getPanGeneSet = async (id: string) => {
    const { data } = await api.get(`/pan-gene-set/${id}`);
    return data;
};

export const getPanGeneSetOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_PAN_GENE_SET_QUERY_KEY, id],
        queryFn: () => getPanGeneSet(id),
    });

type UseGetPanGeneSet = {
    queryConfig?: QueryConfig<typeof getPanGeneSetOptions>;
    id: string;
};

export const useGetPanGeneSet = ({ queryConfig, id }: UseGetPanGeneSet) => {
    return useQuery({
        ...getPanGeneSetOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
