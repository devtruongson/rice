import {
    Box,
    BoxProps,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { routesMap } from '../../../routes/routes';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import icons from '../../../constants/icons';

type Props = {} & BoxProps;
const Header = ({ ...props }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());
    const [isSubMenu, setIsSubMenu] = useState(false);
    const [isSubMenuSeach, setIsSubMenuSeach] = useState(false);

    return (
        <Flex as="nav" wrap="wrap" padding={6} bg="teal.500" color="white" {...props}>
            <Flex align="center" justify="space-between">
                <Flex align="center" mr={5}>
                    <Link to={routesMap.Home}>
                        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                            Rice Genome
                        </Heading>
                    </Link>
                </Flex>

                <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20px"
                        height="20px"
                        viewBox="0 0 12 12"
                        enable-background="new 0 0 12 12"
                        id="Слой_1"
                        version="1.1"
                        xmlSpace="preserve"
                    >
                        <g>
                            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="5.5" />
                            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="2.5" />
                            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="8.5" />
                        </g>
                    </svg>
                </Box>

                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
                    width={{ base: 'full', md: 'auto' }}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                >
                    <Box>
                        <Menu>
                            <MenuButton>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    fontWeight={600}
                                    color={'#fff'}
                                    _hover={{
                                        color: '#ee4d2d',
                                    }}
                                    rightIcon={<Icon as={icons.caretDown} />}
                                >
                                    Home
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <Link to={routesMap.OverView}>
                                        <MenuItem>Project Overview</MenuItem>
                                    </Link>
                                    <Link to={routesMap.News}>
                                        <MenuItem>News</MenuItem>
                                    </Link>
                                    <Link to={routesMap.FAQ}>
                                        <MenuItem>FAQ</MenuItem>
                                    </Link>
                                    <Link to={routesMap.Contatcts}>
                                        <MenuItem>Contacts Us</MenuItem>
                                    </Link>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                    <Box>
                        <Menu>
                            <MenuButton>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    fontWeight={600}
                                    color={'#fff'}
                                    _hover={{
                                        color: '#ee4d2d',
                                    }}
                                    rightIcon={<Icon as={icons.caretDown} />}
                                >
                                    Rice Gene Annotation
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <Box
                                        position="relative"
                                        onMouseEnter={() => setIsSubMenu(true)}
                                        onMouseLeave={() => setIsSubMenu(false)}
                                    >
                                        <MenuItem>
                                            <HStack justifyContent="space-between" w={'100%'}>
                                                <Text>Pseudomolecules</Text>
                                                <Icon as={icons.caretRight} textAlign="end" />
                                            </HStack>
                                        </MenuItem>

                                        <Box
                                            position="absolute"
                                            left="100%"
                                            top="0"
                                            boxShadow="md"
                                            borderRadius="md"
                                            minW="220px"
                                            zIndex="10"
                                            transition="opacity 0.2s ease-in-out"
                                            display={isSubMenu ? 'block' : 'none'}
                                        >
                                            <MenuList>
                                                <Link to={routesMap.PseudoCurrent}>
                                                    <MenuItem>Current Pseudomolecules</MenuItem>
                                                </Link>
                                                <MenuItem>Pseudomolecule Version Converter</MenuItem>
                                                <MenuItem>Centromeres in the Pseudomolecules</MenuItem>
                                                <MenuItem>Putative SSRs in the Pseudomolecules</MenuItem>
                                                <MenuItem>Organellar Insertions</MenuItem>
                                            </MenuList>
                                        </Box>
                                    </Box>

                                    <Link to={routesMap.AnnotationOryza}>
                                        <MenuItem>Oryza Repeat Database</MenuItem>
                                    </Link>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                    <Box>
                        <Menu>
                            <MenuButton>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    _hover={{
                                        color: '#ee4d2d',
                                    }}
                                    fontWeight={600}
                                    color={'#fff'}
                                    rightIcon={<Icon as={icons.caretDown} />}
                                >
                                    Analyses/Tools
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <Box
                                        position="relative"
                                        onMouseEnter={() => setIsSubMenuSeach(true)}
                                        onMouseLeave={() => setIsSubMenuSeach(false)}
                                    >
                                        <MenuItem>
                                            <HStack justifyContent="space-between" w={'100%'}>
                                                <Text>Search Functions</Text>
                                                <Icon as={icons.caretRight} textAlign="end" />
                                            </HStack>
                                        </MenuItem>

                                        <Box
                                            position="absolute"
                                            left="100%"
                                            top="0"
                                            boxShadow="md"
                                            borderRadius="md"
                                            minW="220px"
                                            zIndex="10"
                                            transition="opacity 0.2s ease-in-out"
                                            display={isSubMenuSeach ? 'block' : 'none'}
                                        >
                                            <MenuList>
                                                <MenuItem>Sequence (BLAST) Search</MenuItem>
                                                <MenuItem>Putative Function Search</MenuItem>
                                                <MenuItem>Locus Search</MenuItem>
                                                <MenuItem>Domain Search</MenuItem>
                                                <MenuItem>Motif Search</MenuItem>
                                                <MenuItem>tRNA Search</MenuItem>
                                                <MenuItem>GO Retrieval</MenuItem>
                                            </MenuList>
                                        </Box>
                                    </Box>
                                    <MenuItem value={Math.random().toString()}>Gene Expression</MenuItem>
                                    <MenuItem value={Math.random().toString()}>Gene Coexpression</MenuItem>
                                    <MenuItem value={Math.random().toString()}>Syntelogs</MenuItem>
                                    <MenuItem value={Math.random().toString()}>Gene Nomenclature</MenuItem>
                                    <MenuItem value={Math.random().toString()}>Genome Facts</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                    <Box>
                        <Button
                            variant="plain"
                            size="sm"
                            fontWeight={600}
                            color={'#fff'}
                            _hover={{
                                color: '#ee4d2d',
                            }}
                            onClick={() =>
                                window.open('https://rice.uga.edu/jb2/?session=local-FCWky9JwdGzmRw33L332K', '_blank')
                            }
                        >
                            Genome Browser
                        </Button>
                    </Box>
                    <Box>
                        <Menu>
                            <MenuButton>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    _hover={{
                                        color: '#ee4d2d',
                                    }}
                                    fontWeight={600}
                                    color={'#fff'}
                                    rightIcon={<Icon as={icons.caretDown} />}
                                >
                                    Downloads
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem value={Math.random().toString()}>Genome Annotation Data Files</MenuItem>
                                    <MenuItem value={Math.random().toString()}>
                                        Genome Annotation Batch Download
                                    </MenuItem>
                                    <MenuItem value={Math.random().toString()}>Legacy Download Site</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
    );
};

export default Header;
