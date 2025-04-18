import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_GENE_QUERY_KEY = 'gene';

const getGene = async (id: string) => {
    const { data } = await api.get(`/gene/${id}`);
    return data;
};

export const getGeneOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_GENE_QUERY_KEY, id],
        queryFn: () => getGene(id),
    });

type UseGetGene = {
    queryConfig?: QueryConfig<typeof getGeneOptions>;
    id: string;
};

export const useGetGene = ({ queryConfig, id }: UseGetGene) => {
    return useQuery({
        ...getGeneOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
