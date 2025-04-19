import api from '../../libs/axios';
import { QueryConfig } from '../../libs/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_STUDY_QUERY_KEY = 'study';

const getStudy = async (id: string) => {
    const { data } = await api.get(`/study/${id}`);
    return data;
};

export const getStudyOptions = (id: string) =>
    queryOptions({
        queryKey: [GET_STUDY_QUERY_KEY, id],
        queryFn: () => getStudy(id),
    });

type UseGetStudy = {
    queryConfig?: QueryConfig<typeof getStudyOptions>;
    id: string;
};

export const useGetStudy = ({ queryConfig, id }: UseGetStudy) => {
    return useQuery({
        ...getStudyOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
