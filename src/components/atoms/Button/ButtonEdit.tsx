import { Button, Icon } from '@chakra-ui/react';
import icons from '../../../constants/icons';

type Props = {
    action: () => void;
};

const ButtonEdit = ({ action }: Props) => {
    return (
        <Button
            leftIcon={<Icon as={icons.pen} />}
            bg={'orange'}
            color="white"
            fontSize={14}
            variant="variants"
            onClick={action}
        >
            Edit
        </Button>
    );
};

export default ButtonEdit;
