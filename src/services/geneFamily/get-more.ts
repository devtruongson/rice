import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_GENE_FAMILY_QUERY_KEY = 'gene_familys';

type PropsType = {
    page?: number;
    pageSize?: number;
};

const getGeneFamilys = async (rest: PropsType) => {
    const page = rest?.page || 1;
    const pageSize = rest?.pageSize || 10;
    const { data } = await api.get(`/gene-family/limit?page=${page}&pageSize=${pageSize}`);
    return data;
};

export const getPostGeneFamilysOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_GENE_FAMILY_QUERY_KEY, rest],
        queryFn: () => getGeneFamilys(rest),
    });

type UseGetGeneFamilys = {
    queryConfig?: QueryConfig<typeof getPostGeneFamilysOptions>;
    rest: PropsType;
};

export const useGetGeneFamilys = ({ queryConfig, rest }: UseGetGeneFamilys) => {
    return useQuery({
        ...getPostGeneFamilysOptions(rest),
        ...queryConfig,
    });
};
