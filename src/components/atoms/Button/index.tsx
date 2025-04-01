import { Button, ButtonProps } from '@chakra-ui/react';
import colors from '../../../constants/colors';

type Props = {
    text: string;
    action: () => void;
    isDisabled?: boolean;
} & ButtonProps;
const ButtonCustom = ({ text, action, isDisabled = false, ...props }: Props) => {
    return (
        <Button
            bg={isDisabled ? 'white' : colors.brand}
            borderColor={isDisabled ? '#ccc' : colors.brand}
            border="1px solid"
            rounded="none"
            color="white"
            textTransform="uppercase"
            isDisabled={isDisabled}
            onClick={action}
            variant="variants"
            {...props}
        >
            {text}
        </Button>
    );
};

export default ButtonCustom;
