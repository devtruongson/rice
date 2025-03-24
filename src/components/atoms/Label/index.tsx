import { BoxProps, Text } from '@chakra-ui/react';

type Props = {
    label: string;
} & BoxProps;
const Label = ({ label, ...props }: Props) => {
    return (
        <Text textAlign="center" fontSize={20} fontWeight={500} {...props}>
            {label}
        </Text>
    );
};

export default Label;
