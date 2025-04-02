import { Box, BoxProps, Grid, GridItem, Text } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchGeneFormType } from '../../../type/gene';
import SelectCustom from '../../atoms/Select';
import ButtonCustom from '../../atoms/Button';
import { defaultSearchTranslationFormSchema, searchTranslationFormSchema } from './form-schema';
import TextareaCustom from '../../atoms/TextArea';

type Props = {
    onSubmit: (data: SearchGeneFormType) => void;
} & BoxProps;
const SearchTranslationForm = ({ onSubmit, ...props }: Props) => {
    const formMethods = useForm<SearchGeneFormType>({
        resolver: yupResolver(searchTranslationFormSchema),
        defaultValues: defaultSearchTranslationFormSchema,
    });

    const { handleSubmit } = formMethods;

    return (
        <Box {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormProvider {...formMethods}>
                    <TextareaCustom
                        field="identifier"
                        label="Gene Identifiers"
                        eg="e.g. glyma.Lee.gnm2.ann1.Gm_00017 glyma.Wm82.gnm1.ann1.Glyma01g00510 glyma.Wm82.gnm2.ann1.Glyma.08G002000"
                        minH={150}
                    />
                    <Text mb={3} mt={6}>
                        Constraints target pangenes must satisfy
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
                        {/* <GridItem w="100%" colSpan={3}></GridItem> */}
                        <GridItem w="100%">
                            <SelectCustom field="genus" label="Genus" options={[]} placeholder="Glycine" />
                        </GridItem>
                        <GridItem w="100%">
                            <SelectCustom field="species" label="Species" options={[]} placeholder="any" />
                        </GridItem>
                        <GridItem w="100%">
                            <SelectCustom field="strain" label="Strain" options={[]} placeholder="any" />
                        </GridItem>
                        <GridItem w="100%">
                            <SelectCustom field="assembly" label="Assembly" options={[]} placeholder="any" />
                        </GridItem>
                        <GridItem w="100%">
                            <SelectCustom field="annotation" label="Annotation" options={[]} placeholder="any" />
                        </GridItem>
                    </Grid>

                    <ButtonCustom text="SEARCh" action={() => {}} type="submit" />
                </FormProvider>
            </form>
        </Box>
    );
};

export default SearchTranslationForm;
