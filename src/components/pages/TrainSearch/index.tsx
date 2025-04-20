import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicTemplate from '../../templates/BasicTemplate';
import BasicSelect from '../../atoms/Select/BasicSelect';
import BasicInput from '../../atoms/Input/BasicInput';
import { useGetSpecies } from '../../../services/species/get-all';
import { SpeciesResType } from '../../../type/species';
import { useEffect, useMemo, useState } from 'react';
import ButtonCustom from '../../atoms/Button';
import TableCusTom from '../../molecules/Table';
import { useGetStudies } from '../../../services/study/get-more';
import { useSearchParams } from 'react-router-dom';
import { StudyResType } from '../../../type/study';
import Pagination from '../../molecules/Pagination';

const defaultValue = {
    species: '',
    study_type: '',
    traits: '',
    publication_id: '',
    author: '',
};
const TrainSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataFilter, setDataFilter] = useState(defaultValue);
    const getParam = (key: string, fallback: string = '') => searchParams.get(key) || fallback;
    const page = useMemo(() => Number(getParam('page', '1')), [searchParams]);
    const pageSize = useMemo(() => Number(getParam('pageSize', '10')), [searchParams]);
    // const [urlModal, setUrlModal] = useState('');

    const filterParams = useMemo(
        () => ({
            species: getParam('species'),
            study_type: getParam('study_type'),
            traits: getParam('traits'),
            publication_id: getParam('publication_id'),
            author: getParam('author'),
        }),
        [searchParams],
    );
    const { data } = useGetSpecies({});
    const speciesOptions = useMemo(
        () =>
            data?.data?.map((item: SpeciesResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [data],
    );

    const { data: studyData } = useGetStudies({
        rest: { page: page, pageSize: pageSize, ...filterParams },
    });
    const studies = useMemo(() => studyData?.data?.data.map((item: StudyResType) => ({ ...item })) || [], [studyData]);

    const handleSearch = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const filteredParams = Object.fromEntries(Object.entries(dataFilter).filter(([_, value]) => value !== ''));
        setSearchParams({
            page: String(1),
            pageSize: String(10),
            ...filteredParams,
        });
    };

    useEffect(() => {
        setDataFilter({ ...dataFilter, ...filterParams });
    }, [filterParams]);

    return (
        <BasicTemplate size="medium">
            <Box>
                <Text fontSize={24} mb={10}>
                    Trait Association Search
                </Text>
                <Box>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems="flex-end" mb={4}>
                        <GridItem>
                            <BasicSelect
                                label="Genus"
                                placeholder="Manihot"
                                value={''}
                                onChange={() => {}}
                                options={[]}
                                isDisabled={true}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicSelect
                                label="Species"
                                placeholder="Choose Species"
                                value={dataFilter.species}
                                onChange={(e) => setDataFilter({ ...dataFilter, species: e.target.value })}
                                options={speciesOptions}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicSelect
                                label="Study Type"
                                placeholder="Choose Study Type"
                                value={dataFilter.study_type}
                                onChange={(e) => setDataFilter({ ...dataFilter, study_type: e.target.value })}
                                options={[
                                    { value: 'GWAS', label: 'GWAS' },
                                    { value: 'QTL', label: 'QTL' },
                                ]}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicInput
                                label="Traits"
                                placeholder="Enter traits"
                                value={dataFilter.traits}
                                onChange={(e) => setDataFilter({ ...dataFilter, traits: e.target.value })}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicInput
                                label="Publication ID (DOI or PMID)"
                                placeholder="Enter Publication ID"
                                value={dataFilter.publication_id}
                                onChange={(e) => setDataFilter({ ...dataFilter, publication_id: e.target.value })}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicInput
                                label="Author"
                                placeholder="Enter author"
                                value={dataFilter.author}
                                onChange={(e) => setDataFilter({ ...dataFilter, author: e.target.value })}
                            />
                        </GridItem>
                    </Grid>
                    <Flex mb={4}>
                        <ButtonCustom text="Search" action={handleSearch} />
                    </Flex>
                    <TableCusTom
                        columns={[
                            { key: 'study_name', label: 'study_name' },
                            { key: 'study_type', label: 'study_type' },
                            { key: 'synopsis', label: 'synopsis' },
                            { key: 'description', label: 'description' },
                            { key: 'genotypes', label: 'genotypes' },
                        ]}
                        data={studies}
                    />
                    <Pagination currentPage={page} totalPage={studyData?.data?.totalPages || 1} />
                </Box>
            </Box>
        </BasicTemplate>
    );
};

export default TrainSearch;
