import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_GENES_QUERY_KEY = 'genes';

type PropsType = {
    textSearch?: string;
    page?: number;
    pageSize?: number;
    species?: string;
    strain?: string;
    identifier?: string;
    description?: string;
    gene_family?: string;
};

const getGenes = async (rest: PropsType) => {
    // const page = rest?.page || 1;
    // const pageSize = rest?.pageSize || 10;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
        page: rest.page || 1,
        pageSize: rest.pageSize || 10,
    };
    if (rest.textSearch) params.textSearch = rest.textSearch;
    if (rest.species) params.species = rest.species;
    if (rest.strain) params.strain = rest.strain;
    if (rest.identifier) params.identifier = rest.identifier;
    if (rest.description) params.description = rest.description;
    if (rest.gene_family) params.gene_family = rest.gene_family;
    const query = new URLSearchParams(params).toString();
    const { data } = await api.get(`/gene?${query}`);
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
