import colors from '../../../constants/colors';

type Props = {
    href: string;
    title: string;
};

const LinkBlank = ({ href, title }: Props) => {
    return (
        <a href={href} target="_blank" style={{ color: colors.brand, textDecoration: 'underline' }}>
            {title}
        </a>
    );
};

export default LinkBlank;
