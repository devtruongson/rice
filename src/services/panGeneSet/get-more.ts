import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_PAN_GENE_SET_MORE_QUERY_KEY = 'pan-gene-sets';

type PropsType = {
    type: string;
    page?: number;
    pageSize?: number;
};

const getPanGeneSets = async (rest: PropsType) => {
    const page = rest?.page || 1;
    const pageSize = rest?.pageSize || 10;
    const { data } = await api.get(`/pan-gene-set/limit?page=${page}&pageSize=${pageSize}`);
    return data;
};

export const getPanGeneSetOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_PAN_GENE_SET_MORE_QUERY_KEY, rest],
        queryFn: () => getPanGeneSets(rest),
    });

type UseGetPanGeneSet = {
    queryConfig?: QueryConfig<typeof getPanGeneSetOptions>;
    rest: PropsType;
};

export const useGetPanGeneSets = ({ queryConfig, rest }: UseGetPanGeneSet) => {
    return useQuery({
        ...getPanGeneSetOptions(rest),
        ...queryConfig,
    });
};
