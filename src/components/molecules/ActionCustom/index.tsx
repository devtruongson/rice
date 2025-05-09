import { Button, HStack, Icon } from '@chakra-ui/react';
import icons from '../../../constants/icons';
import colors from '../../../constants/colors';

type Props = {
    actionShow?: () => void;
    actionDelete: () => void;
    actionEdit: () => void;
};

const ActionCustom = ({ actionDelete, actionEdit, actionShow }: Props) => {
    return (
        <HStack>
            {actionShow && (
                <Button
                    leftIcon={<Icon as={icons.eye} />}
                    bg={colors.brand}
                    color="white"
                    fontSize={14}
                    variant="variants"
                    onClick={actionShow}
                >
                    Xem chi tiết
                </Button>
            )}

            <Button
                leftIcon={<Icon as={icons.trash} />}
                bg={'red'}
                color="white"
                fontSize={14}
                variant="variants"
                onClick={actionDelete}
            >
                Xóa
            </Button>
            <Button
                leftIcon={<Icon as={icons.pen} />}
                bg={'orange'}
                color="white"
                fontSize={14}
                variant="variants"
                onClick={actionEdit}
            >
                Cập nhật
            </Button>
        </HStack>
    );
};

export default ActionCustom;
