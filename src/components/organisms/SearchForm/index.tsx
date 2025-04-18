import { Box, BoxProps, Grid, GridItem } from '@chakra-ui/react';
import InputCustom from '../../atoms/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchGeneFormType } from '../../../type/gene';
import { defaultsearchGeneFormSchema, searchGeneFormSchema } from './form-schema';
import SelectCustom from '../../atoms/Select';
import ButtonCustom from '../../atoms/Button';
import { useGetStrains } from '../../../services/strain/get-all';
import { useMemo } from 'react';
import { StrainResType } from '../../../type/strain';

type Props = {
    onSubmit: (data: SearchGeneFormType) => void;
} & BoxProps;
const SearchForm = ({ onSubmit, ...props }: Props) => {
    const formMethods = useForm<SearchGeneFormType>({
        resolver: yupResolver(searchGeneFormSchema),
        defaultValues: defaultsearchGeneFormSchema,
    });

    const { data } = useGetStrains({});
    const strains = useMemo(
        () =>
            data?.data?.map((item: StrainResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [data],
    );

    const { handleSubmit } = formMethods;

    return (
        <Box {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormProvider {...formMethods}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
                        <GridItem w="100%">
                            <SelectCustom field="genus" label="Genus" options={[]} placeholder="Glycine" isDisabled />
                        </GridItem>
                        <GridItem w="100%">
                            <SelectCustom field="species" label="Species" options={[]} placeholder="any" />
                        </GridItem>
                        <GridItem w="100%">
                            <SelectCustom field="strain" label="Strain" options={strains} placeholder="any" />
                        </GridItem>
                        <GridItem w="100%">
                            <InputCustom field="identifier" label="Identifier" eg="e.g. Glyma.16G044100" />
                        </GridItem>
                        <GridItem w="100%">
                            <InputCustom field="description" label="Description" eg="e.g. proteasome subunit alpha" />
                        </GridItem>
                        <GridItem w="100%">
                            <InputCustom field="gene_family_id" label="Gene Family ID" eg="e.g. L_6BFHQX" />
                        </GridItem>
                    </Grid>

                    <ButtonCustom text="SEARCh" action={() => {}} type="submit" />
                </FormProvider>
            </form>
        </Box>
    );
};

export default SearchForm;
