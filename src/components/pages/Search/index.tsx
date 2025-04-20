import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicTemplate from '../../templates/BasicTemplate';
import TableCusTom from '../../molecules/Table';
import { GeneResType } from '../../../type/gene';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useGetSpecies } from '../../../services/species/get-all';
import { SpeciesResType } from '../../../type/species';
import BasicSelect from '../../atoms/Select/BasicSelect';
import BasicInput from '../../atoms/Input/BasicInput';
import ButtonCustom from '../../atoms/Button';
import Pagination from '../../molecules/Pagination';
import { useGetGenes } from '../../../services/gene/get-genes';
import { useGetStrains } from '../../../services/strain/get-all';

const defaultValue = {
    species: '',
    strain: '',
    identifier: '',
    description: '',
    gene_family: '',
};
const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataFilter, setDataFilter] = useState(defaultValue);
    const getParam = (key: string, fallback: string = '') => searchParams.get(key) || fallback;
    const page = useMemo(() => Number(getParam('page', '1')), [searchParams]);
    const pageSize = useMemo(() => Number(getParam('pageSize', '10')), [searchParams]);
    // const [urlModal, setUrlModal] = useState('');

    const filterParams = useMemo(
        () => ({
            species: getParam('species'),
            strain: getParam('strain'),
            identifier: getParam('identifier'),
            description: getParam('description'),
            gene_family: getParam('gene_family'),
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

    const { data: strainData } = useGetStrains({});
    const strainOptions = useMemo(
        () =>
            strainData?.data?.map((item: SpeciesResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [strainData],
    );

    const { data: geneData } = useGetGenes({
        rest: { page: page, pageSize: pageSize, ...filterParams },
    });
    const genes = useMemo(
        () =>
            geneData?.data?.data.map((item: GeneResType) => ({
                ...item,
                identifier: item?.identifier?.name,
                location: item?.location?.name,
                gene_family: item?.gene_family?.name,
                pan_gene_set: item?.pan_gene_set?.name,
                species: item?.species?.name,
                strain: item?.strain?.name,
            })) || [],
        [geneData],
    );

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

    console.log(dataFilter);

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
                                label="Strain"
                                placeholder="Choose Strain"
                                value={dataFilter.strain}
                                onChange={(e) => setDataFilter({ ...dataFilter, strain: e.target.value })}
                                options={strainOptions}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicInput
                                label="Identifier"
                                placeholder="Enter identifier"
                                value={dataFilter.identifier}
                                onChange={(e) => setDataFilter({ ...dataFilter, identifier: e.target.value })}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicInput
                                label="Description"
                                placeholder="Enter description"
                                value={dataFilter.description}
                                onChange={(e) => setDataFilter({ ...dataFilter, description: e.target.value })}
                            />
                        </GridItem>
                        <GridItem>
                            <BasicInput
                                label="Gene Family ID"
                                placeholder="Enter gene family ID"
                                value={dataFilter.gene_family}
                                onChange={(e) => setDataFilter({ ...dataFilter, gene_family: e.target.value })}
                            />
                        </GridItem>
                    </Grid>
                    <Flex mb={4}>
                        <ButtonCustom text="Search" action={handleSearch} />
                    </Flex>
                    <TableCusTom
                        columns={[
                            {
                                key: 'name',
                                label: 'Name',
                            },
                            {
                                key: 'identifier',
                                label: 'Identifier',
                            },
                            {
                                key: 'location',
                                label: 'Location',
                            },
                            {
                                key: 'description',
                                label: 'Description',
                            },
                            {
                                key: 'gene_family',
                                label: 'Gene Family Assignments',
                            },
                            {
                                key: 'pan_gene_sets',
                                label: 'PanGene Sets',
                            },
                            {
                                key: 'genus',
                                label: 'Genus',
                            },
                            {
                                key: 'species',
                                label: 'Species',
                            },
                            {
                                key: 'strain',
                                label: 'Strain',
                            },
                        ]}
                        data={genes}
                    />
                    <Pagination currentPage={page} totalPage={geneData?.data?.totalPages || 1} />
                </Box>
            </Box>
        </BasicTemplate>
    );
};

export default Search;
