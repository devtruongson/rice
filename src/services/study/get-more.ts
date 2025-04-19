import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_STUDYS_QUERY_KEY = 'studies';

type PropsType = {
    page?: number;
    pageSize?: number;
};

const getStudies = async (rest: PropsType) => {
    const page = rest?.page || 1;
    const pageSize = rest?.pageSize || 10;
    const { data } = await api.get(`/study?page=${page}&pageSize=${pageSize}`);
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
