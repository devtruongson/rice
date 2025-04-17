import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_GENE_FAMILY_QUERY_KEY = 'gene_family';

const getGeneFamily = async (id: string) => {
    const { data } = await api.get(`/gene-family/${id}`);
    return data;
};

export const getGeneFamilyOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_GENE_FAMILY_QUERY_KEY],
        queryFn: () => getGeneFamily(id),
    });

type UseGetGeneFamily = {
    queryConfig?: QueryConfig<typeof getGeneFamilyOptions>;
    id: string;
};

export const useGetGeneFamily = ({ queryConfig, id }: UseGetGeneFamily) => {
    return useQuery({
        ...getGeneFamilyOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
