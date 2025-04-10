// import api from '@/libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const GET_GENES_QUERY_KEY = 'genes';

const getListGene = async (names: string[]) => {
    const query = names.map((item) => `names=${item}`).join('&');
    const { data } = await axios.get(`http://localhost:8080/api/v1/gene/list?${query}`);
    return data;
};

export const getListGeneOptions = (names: string[]) =>
    queryOptions({
        queryKey: [GET_GENES_QUERY_KEY],
        queryFn: () => getListGene(names),
    });

type UseGetListGeneType = {
    queryConfig?: QueryConfig<typeof getListGeneOptions>;
    names: string[];
};

export const useListGene = ({ queryConfig, names }: UseGetListGeneType) => {
    return useQuery({
        ...getListGeneOptions(names),
        ...queryConfig,
    });
};
