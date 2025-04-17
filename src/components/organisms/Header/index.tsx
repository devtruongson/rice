import {
    Box,
    BoxProps,
    HStack,
    Icon,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Text,
} from '@chakra-ui/react';
import { HEADER_HEIGHT, personalBrand } from '../../../constants';
import colors from '../../../constants/colors';
import logo from '../../../assets/sb_logo.png';
import icons from '../../../constants/icons';
import { listCatesHeader } from '../../../constants/header';
import { Link, useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';

type Props = {
    type?: 'admin' | 'user';
} & BoxProps;
const Header = ({ type = 'user', ...props }: Props) => {
    const navigate = useNavigate();
    return (
        <HStack
            {...props}
            w="full"
            height={HEADER_HEIGHT}
            bg={colors.brand}
            px={4}
            justifyContent="space-between"
            position="fixed"
            top={0}
            right={0}
            left={0}
            zIndex={1000}
        >
            <HStack color="white" onClick={() => navigate(routesMap.Home)}>
                <Image src={logo} w={12} h={12} />
                <Box>
                    <Text fontSize={24} fontWeight={500}>
                        {personalBrand}
                    </Text>
                    <Text>Integrating Genetics and Genomics to Advance Soybean Research</Text>
                </Box>
            </HStack>

            {type === 'user' ? (
                <HStack>
                    <HStack gap={6}>
                        {listCatesHeader.map((item, index) => {
                            return (
                                <Menu key={index}>
                                    <Link to={item.path}>
                                        <MenuButton as={Text} color="white" _hover={{ textDecoration: 'underline' }}>
                                            {item.label}
                                        </MenuButton>
                                    </Link>
                                    <Portal>
                                        {item?.children?.length ? (
                                            <MenuList zIndex={999999}>
                                                {item?.children?.map((itemChild, indexChild) => {
                                                    return (
                                                        <Link
                                                            to={itemChild.path}
                                                            key={indexChild}
                                                            target={itemChild?.isBlank ? '_blank' : ''}
                                                        >
                                                            <MenuItem>{itemChild.label}</MenuItem>
                                                        </Link>
                                                    );
                                                })}
                                            </MenuList>
                                        ) : null}
                                    </Portal>
                                </Menu>
                            );
                        })}
                        {[icons.xTwitter, icons.mail, icons.github, icons.bell].map((item, index) => {
                            return <Icon as={item} key={index} fontSize={20} color="white" />;
                        })}
                        <Icon
                            as={icons.user}
                            fontSize={20}
                            color="white"
                            cursor="pointer"
                            onClick={() => navigate(routesMap.PostAdmin)}
                        />
                    </HStack>
                </HStack>
            ) : null}
        </HStack>
    );
};

export default Header;
