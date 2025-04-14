import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_GENES_QUERY_KEY = 'genes';

const getListGene = async (names: string) => {
    const list = names
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);
    const query = list.map((item) => `names=${item}`).join('&');
    const { data } = await api.get(`/gene/list?${query}`);
    return data;
};

export const getListGeneOptions = (names: string) =>
    queryOptions({
        queryKey: [GET_GENES_QUERY_KEY],
        queryFn: () => getListGene(names),
    });

type UseGetListGeneType = {
    queryConfig?: QueryConfig<typeof getListGeneOptions>;
    names: string;
    enabled: boolean;
};

export const useGetListGene = ({ queryConfig, names, enabled }: UseGetListGeneType) => {
    return useQuery({
        ...getListGeneOptions(names),
        ...queryConfig,
        enabled: enabled,
    });
};
