import { Box, Text } from '@chakra-ui/react';
import BasicTemplate from '../../templates/BasicTemplate';
import SearchForm from '../../organisms/SearchForm';
import TableCusTom from '../../molecules/Table';
import { SearchGeneFormType } from '../../../type/gene';

const Search = () => {
    const handleSubmit = (data: SearchGeneFormType) => {
        console.log(data);
    };
    return (
        <BasicTemplate size="medium">
            <Box>
                <Text fontSize={24} mb={10}>
                    Gene Search
                </Text>
                <SearchForm onSubmit={handleSubmit} mb={6} />
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
                            key: 'locations',
                            label: 'Locations',
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
                    data={[]}
                />
            </Box>
        </BasicTemplate>
    );
};

export default Search;
