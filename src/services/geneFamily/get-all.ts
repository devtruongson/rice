import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_ALL_GENE_FAMILY_QUERY_KEY = 'gene_family_AL';

const getGeneFamilys = async () => {
    const { data } = await api.get(`/gene-family`);
    return data;
};

export const getPostGeneFamilysOptions = () =>
    queryOptions({
        queryKey: [GET_ALL_GENE_FAMILY_QUERY_KEY],
        queryFn: () => getGeneFamilys(),
    });

type UseGetGeneFamilys = {
    queryConfig?: QueryConfig<typeof getPostGeneFamilysOptions>;
};

export const useGetAllGeneFamily = ({ queryConfig }: UseGetGeneFamilys) => {
    return useQuery({
        ...getPostGeneFamilysOptions(),
        ...queryConfig,
    });
};
