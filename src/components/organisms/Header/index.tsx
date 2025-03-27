import { Box, BoxProps, HStack, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { HEADER_HEIGHT, personalBrand } from '../../../constants';
import colors from '../../../constants/colors';
import logo from '../../../assets/sb_logo.png';
import icons from '../../../constants/icons';
import { listCatesHeader } from '../../../constants/header';
import { Link } from 'react-router-dom';

type Props = {} & BoxProps;
const Header = ({ ...props }: Props) => {
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
        >
            <HStack color="white">
                <Image src={logo} w={12} h={12} />
                <Box>
                    <Text fontSize={24} fontWeight={500}>
                        {personalBrand}
                    </Text>
                    <Text>Integrating Genetics and Genomics to Advance Soybean Research</Text>
                </Box>
            </HStack>

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
                                {item?.children?.length ? (
                                    <MenuList>
                                        {item?.children?.map((itemChild, indexChild) => {
                                            return (
                                                <Link to={itemChild.path} key={indexChild}>
                                                    <MenuItem>{itemChild.label}</MenuItem>
                                                </Link>
                                            );
                                        })}
                                    </MenuList>
                                ) : null}
                            </Menu>
                        );
                    })}
                    {[icons.xTwitter, icons.mail, icons.github, icons.bell].map((item, index) => {
                        return <Icon as={item} key={index} fontSize={20} color="white" />;
                    })}
                </HStack>
            </HStack>
        </HStack>
    );
};

export default Header;
