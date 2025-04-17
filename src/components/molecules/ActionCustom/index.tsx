import { Button, HStack, Icon } from '@chakra-ui/react';
import icons from '../../../constants/icons';

type Props = {
    actionDelete: () => void;
    actionEdit: () => void;
};

const ActionCustom = ({ actionDelete, actionEdit }: Props) => {
    return (
        <HStack>
            <Button
                leftIcon={<Icon as={icons.trash} />}
                bg={'red'}
                color="white"
                fontSize={14}
                variant="variants"
                onClick={actionDelete}
            >
                Delete
            </Button>
            <Button
                leftIcon={<Icon as={icons.pen} />}
                bg={'orange'}
                color="white"
                fontSize={14}
                variant="variants"
                onClick={actionEdit}
            >
                Edit
            </Button>
        </HStack>
    );
};

export default ActionCustom;
