import { Box, Select, SelectProps, Text } from '@chakra-ui/react';
import { SearchGeneFormType, SearchTranslationFormType } from '../../../type/gene';
import { useFormContext } from 'react-hook-form';

type Props = {
    label: string;
    field:
        | keyof Pick<SearchGeneFormType, 'genus' | 'species' | 'strain'>
        | keyof Pick<SearchTranslationFormType, 'genus' | 'species' | 'strain' | 'assembly' | 'annotation'>;
    options: { label: string; value: string }[];
    placeholder?: string;
} & SelectProps;
const SelectCustom = ({ label, field, options, placeholder, ...props }: Props) => {
    const { register, setValue } = useFormContext<SearchGeneFormType | SearchTranslationFormType>();

    return (
        <Box>
            <Text mb={3}>{label}</Text>
            <Select
                {...register(field)}
                onChange={(e) => setValue(field, e.target.value)}
                placeholder={placeholder}
                {...props}
            >
                {options?.length > 0
                    ? options?.map((item) => {
                          return (
                              <option key={item.value} value={item.value}>
                                  {item.label}
                              </option>
                          );
                      })
                    : null}
            </Select>
        </Box>
    );
};

export default SelectCustom;
