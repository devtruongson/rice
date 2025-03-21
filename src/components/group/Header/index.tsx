import { Box, Button, Flex, Heading, List, Menu, Portal, Stack, useDisclosure } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = (props: any) => {
    const { open, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (open ? onClose() : onOpen());

    console.log(open);

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={6}
            bg="teal.500"
            color="white"
            {...props}
        >
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
                display={{ base: open ? 'block' : 'none', md: 'flex' }}
                width={{ base: 'full', md: 'auto' }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
            >
                <Box>
                    <Menu.Root>
                        <Menu.Trigger>
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
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value={Math.random().toString()}>Project Overview</Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>News</Menu.Item>
                                    <Menu.Item value="new-win">FAQ</Menu.Item>
                                    <Menu.Item value="open-file">Contact Us</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Box>
                <Box>
                    <Menu.Root>
                        <Menu.Trigger>
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
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value={Math.random().toString()}>
                                        <Box>
                                            <Box>Pseudomolecules</Box>
                                            <Box ps={50}>
                                                <List.Root>
                                                    <List.Item py={1}>Current Pseudomolecules</List.Item>
                                                    <List.Item py={1}>Pseudomolecule Version Converter</List.Item>
                                                    <List.Item py={1}>Centromeres in the Pseudomolecules</List.Item>
                                                    <List.Item py={1}>Putative SSRs in the Pseudomolecules</List.Item>
                                                    <List.Item py={1}>Organellar Insertions</List.Item>
                                                </List.Root>
                                            </Box>
                                        </Box>
                                    </Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Oryza Repeat Database</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Box>
                <Box>
                    <Menu.Root>
                        <Menu.Trigger>
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
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value={Math.random().toString()}>
                                        <Box>
                                            <Box>Search Functions</Box>
                                            <Box ps={50}>
                                                <List.Root>
                                                    <List.Item py={1}>Sequence (BLAST) Search</List.Item>
                                                    <List.Item py={1}>Putative Function Search</List.Item>
                                                    <List.Item py={1}>Locus Search</List.Item>
                                                    <List.Item py={1}>Domain Search</List.Item>
                                                    <List.Item py={1}>Motif Search</List.Item>
                                                    <List.Item py={1}>tRNA Search</List.Item>
                                                    <List.Item py={1}>GO Retrieval</List.Item>
                                                </List.Root>
                                            </Box>
                                        </Box>
                                    </Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Gene Expression</Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Gene Coexpression</Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Syntelogs</Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Gene Nomenclature</Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Genome Facts</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
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
                    <Menu.Root>
                        <Menu.Trigger>
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
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value={Math.random().toString()}>Genome Annotation Data Files</Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>
                                        Genome Annotation Batch Download
                                    </Menu.Item>
                                    <Menu.Item value={Math.random().toString()}>Legacy Download Site</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Header;
