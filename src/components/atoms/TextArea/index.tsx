import { Box, Text, Textarea, TextareaProps } from '@chakra-ui/react';
import { SearchTranslationFormType } from '../../../type/gene';
import { useFormContext } from 'react-hook-form';

type Props = {
    field: keyof Pick<SearchTranslationFormType, 'identifier'>;
    label: string;
    eg?: string;
} & TextareaProps;
const TextareaCustom = ({ field, label, eg, ...props }: Props) => {
    const { register } = useFormContext<SearchTranslationFormType>();

    return (
        <Box>
            <Text mb={3}>{label}</Text>
            <Textarea mb={1} {...register(field)} {...props} />
            {eg && <Text>{eg}</Text>}
        </Box>
    );
};

export default TextareaCustom;
