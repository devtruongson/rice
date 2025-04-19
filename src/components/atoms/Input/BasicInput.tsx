import { Box, Input, InputProps, Text } from '@chakra-ui/react';

type Props = {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputProps;

const BasicInput = ({ label, value, onChange, ...props }: Props) => {
    return (
        <Box w="100%">
            {label ? (
                <Text mb={3} textTransform="capitalize">
                    {label}
                </Text>
            ) : null}

            <Input mb={1} {...props} value={value} onChange={(e) => onChange(e)} />
        </Box>
    );
};

export default BasicInput;
