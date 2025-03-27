import { Text, TextProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';

type Props = {
    content: string;
    path: string;
    isBlank?: boolean;
} & TextProps;

const LinkCustom = ({ content, path, isBlank = false, ...props }: Props) => {
    return (
        <Link to={path} target={isBlank ? '_blank' : ''}>
            <Text color={colors.green} _hover={{ textDecoration: 'underline' }} {...props}>
                {content}
            </Text>
        </Link>
    );
};

export default LinkCustom;
