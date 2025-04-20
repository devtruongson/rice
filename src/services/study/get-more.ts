import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_STUDYS_QUERY_KEY = 'studies';

type PropsType = {
    page?: number;
    pageSize?: number;
    species?: string;
    study_type?: string;
    traits?: string;
    publication_id?: string;
    author?: string;
};

const getStudies = async (rest: PropsType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
        page: rest.page || 1,
        pageSize: rest.pageSize || 10,
    };
    console.log('rest >>', rest);
    if (rest.species) params.species = rest.species;
    if (rest.study_type) params.study_type = rest.study_type;
    if (rest.traits) params.traits = rest.traits;
    if (rest.publication_id) params.publication_id = rest.publication_id;
    if (rest.author) params.author = rest.author;
    const query = new URLSearchParams(params).toString();
    const { data } = await api.get(`/study?${query}`);
    return data;
};

export const getStudieOptions = (rest: PropsType) =>
    queryOptions({
        queryKey: [GET_STUDYS_QUERY_KEY, rest],
        queryFn: () => getStudies(rest),
    });

type UseGetStudie = {
    queryConfig?: QueryConfig<typeof getStudieOptions>;
    rest: PropsType;
};

export const useGetStudies = ({ queryConfig, rest }: UseGetStudie) => {
    return useQuery({
        ...getStudieOptions(rest),
        ...queryConfig,
    });
};
