import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_GENES_QUERY_KEY = 'genes';

type PropsType = {
    textSearch?: string;
    page?: number;
    pageSize?: number;
};

const getGenes = async (rest: PropsType) => {
    const page = rest?.page || 1;
    const pageSize = rest?.pageSize || 10;
    const { data } = await api.get(`/gene?textSearch=${rest?.textSearch || ''}&page=${page}&pageSize=${pageSize}`);
    return data;
};

export const getGeneOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_GENES_QUERY_KEY, rest],
        queryFn: () => getGenes(rest),
    });

type UseGetGene = {
    queryConfig?: QueryConfig<typeof getGeneOptions>;
    rest: PropsType;
};

export const useGetGenes = ({ queryConfig, rest }: UseGetGene) => {
    return useQuery({
        ...getGeneOptions(rest),
        ...queryConfig,
    });
};
