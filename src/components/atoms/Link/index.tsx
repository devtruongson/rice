import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';

type Props = {
    href: string;
    title: string;
};

const LinkCustom = ({ href, title }: Props) => {
    return (
        <Link to={href || ''} style={{ color: colors.brand, textDecoration: 'underline' }}>
            {title}
        </Link>
    );
};

export default LinkCustom;
