import {
    Box,
    BoxProps,
    Button,
    Flex,
    Heading,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';

type Props = {} & BoxProps;
const Header = ({ ...props }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    return (
        <Flex as="nav" wrap="wrap" padding={6} bg="teal.500" color="white" {...props}>
            <Flex align="center" justify="space-between">
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        Rice Genome
                    </Heading>
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
                                    _hover={{
                                        color: '#ee4d2d',
                                    }}
                                    fontWeight={600}
                                    color={'#fff'}
                                >
                                    Home
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem value={Math.random().toString()}>
                                        <a href="/home_overview">Project Overview</a>
                                    </MenuItem>
                                    <MenuItem value={Math.random().toString()}>News</MenuItem>
                                    <MenuItem value="new-win">FAQ</MenuItem>
                                    <MenuItem value="open-file">Contact Us</MenuItem>
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
                                >
                                    Rice Gene Annotation
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem value={Math.random().toString()}>
                                        <Box>
                                            <Box>Pseudomolecules</Box>
                                            <Box ps={50}>
                                                <List>
                                                    <ListItem py={1}>Current Pseudomolecules</ListItem>
                                                    <ListItem py={1}>Pseudomolecule Version Converter</ListItem>
                                                    <ListItem py={1}>Centromeres in the Pseudomolecules</ListItem>
                                                    <ListItem py={1}>Putative SSRs in the Pseudomolecules</ListItem>
                                                    <ListItem py={1}>Organellar Insertions</ListItem>
                                                </List>
                                            </Box>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value={Math.random().toString()}>Oryza Repeat Database</MenuItem>
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
                                >
                                    Analyses/Tools
                                </Button>
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem value={Math.random().toString()}>
                                        <Box>
                                            <Box>Search Functions</Box>
                                            <Box ps={50}>
                                                <List>
                                                    <ListItem py={1}>Sequence (BLAST) Search</ListItem>
                                                    <ListItem py={1}>Putative Function Search</ListItem>
                                                    <ListItem py={1}>Locus Search</ListItem>
                                                    <ListItem py={1}>Domain Search</ListItem>
                                                    <ListItem py={1}>Motif Search</ListItem>
                                                    <ListItem py={1}>tRNA Search</ListItem>
                                                    <ListItem py={1}>GO Retrieval</ListItem>
                                                </List>
                                            </Box>
                                        </Box>
                                    </MenuItem>
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
                            _hover={{
                                color: '#ee4d2d',
                            }}
                            fontWeight={600}
                            color={'#fff'}
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
