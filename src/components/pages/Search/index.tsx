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

    // Lấy thông tin filter 
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

    // Lấy danh sách species 
    const { data } = useGetSpecies({});
    const speciesOptions = useMemo(
        () =>
            data?.data?.map((item: SpeciesResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [data],
    );

    // Lấy danh sách strain 
    const { data: strainData } = useGetStrains({});
    const strainOptions = useMemo(
        () =>
            strainData?.data?.map((item: SpeciesResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [strainData],
    );

    // Lấy danh sách gene 
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

    // Xử lý tìm kiếm 
    const handleSearch = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const filteredParams = Object.fromEntries(Object.entries(dataFilter).filter(([_, value]) => value !== ''));
        setSearchParams({
            page: String(1),
            pageSize: String(10),
            ...filteredParams,
        });
    };

    // Set value khi có dữ liệu 
    useEffect(() => {
        setDataFilter({ ...dataFilter, ...filterParams });
    }, [filterParams]);

    return (
        <BasicTemplate size="medium">
            <Box>
                <Text fontSize={24} mb={10}>
                    Tìm kiếm Gene{' '}
                </Text>
                <Box>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems="flex-end" mb={4}>
                        <GridItem>
                            {/* Select chi */}
                            <BasicSelect
                                label="Chi"
                                placeholder="Manihot"
                                value={''}
                                onChange={() => {}}
                                options={[]}
                                isDisabled={true}
                            />
                        </GridItem>
                        <GridItem>
                            {/* Select giống loài */}
                            <BasicSelect
                                label="Giống loài"
                                placeholder="Chọn loài"
                                value={dataFilter.species}
                                onChange={(e) => setDataFilter({ ...dataFilter, species: e.target.value })}
                                options={speciesOptions}
                            />
                        </GridItem>
                        <GridItem>
                            {/* Select huyết thống */}
                            <BasicSelect
                                label="huyết thống"
                                placeholder="Chọn huyết thống"
                                value={dataFilter.strain}
                                onChange={(e) => setDataFilter({ ...dataFilter, strain: e.target.value })}
                                options={strainOptions}
                            />
                        </GridItem>
                        <GridItem>
                            {/* Input mã định danh */}
                            <BasicInput
                                label="Mã định danh"
                                placeholder="Nhập mã định danh"
                                value={dataFilter.identifier}
                                onChange={(e) => setDataFilter({ ...dataFilter, identifier: e.target.value })}
                            />
                        </GridItem>
                        <GridItem>
                            {/* Input mô tả */}
                            <BasicInput
                                label="Mô tả"
                                placeholder="Nhập mô tả"
                                value={dataFilter.description}
                                onChange={(e) => setDataFilter({ ...dataFilter, description: e.target.value })}
                            />
                        </GridItem>
                        <GridItem>
                            {/* Input ID họ gen */}
                            <BasicInput
                                label="ID họ gen"
                                placeholder="Nhập ID họ gen"
                                value={dataFilter.gene_family}
                                onChange={(e) => setDataFilter({ ...dataFilter, gene_family: e.target.value })}
                            />
                        </GridItem>
                    </Grid>
                    <Flex mb={4}>
                        {/* Button tìm kiếm */}
                        <ButtonCustom text="Tìm kiếm" action={handleSearch} />
                    </Flex>
                    {/* Table gene */}
                    <TableCusTom
                        columns={[
                            {
                                key: 'name',
                                label: 'Tên',
                            },
                            {
                                key: 'identifier',
                                label: 'Mã định danh',
                            },
                            {
                                key: 'location',
                                label: 'Vị trí',
                            },
                            {
                                key: 'description',
                                label: 'Miêu tả',
                            },
                            {
                                key: 'gene_family',
                                label: 'Bài tập về họ gen',
                            },
                            {
                                key: 'pan_gene_sets',
                                label: 'Bộ PanGene',
                            },
                            {
                                key: 'genus',
                                label: 'Chi',
                            },
                            {
                                key: 'species',
                                label: 'Giống loài',
                            },
                            {
                                key: 'strain',
                                label: 'huyết thống',
                            },
                        ]}
                        data={genes}
                    />
                    {/* Pagination */}
                    <Pagination currentPage={page} totalPage={geneData?.data?.totalPages || 1} />
                </Box>
            </Box>
        </BasicTemplate>
    );
};

export default Search;
