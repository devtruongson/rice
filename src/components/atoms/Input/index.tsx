import { Box, Input, InputProps, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { SearchGeneFormType } from '../../../type/gene';

type Props = {
    field: keyof Pick<SearchGeneFormType, 'identifier' | 'gene_family_id' | 'description'>;
    label: string;
    value: string;
    eg?: string;
} & InputProps;
const InputCustom = ({ field, label, value, eg, ...props }: Props) => {
    const { register } = useFormContext<SearchGeneFormType>();
    return (
        <Box>
            <Text mb={3}>{label}</Text>
            <Input value={value} mb={1} {...register(field)} {...props} />
            {eg && <Text>{eg}</Text>}
        </Box>
    );
};

export default InputCustom;
