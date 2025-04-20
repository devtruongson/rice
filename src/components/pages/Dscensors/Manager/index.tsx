import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useGetDscensor } from '../../../../services/dscensor/get-more';
import { DscensorResType } from '../../../../type/dscensor';
import ActionCustom from '../../../molecules/ActionCustom';

const Manager = () => {
    const navigate = useNavigate();
    const { data, refetch } = useGetDscensor({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDel, setIdDel] = useState<string | null>(null);

    const cancelRef = useRef<any>(null);

    const dscensors = useMemo(
        () =>
            data?.data?.map((item: DscensorResType) => ({
                ...item,
                action: (
                    <ActionCustom
                        actionDelete={() => {
                            onOpen();
                            setIdDel(item._id);
                        }}
                        actionEdit={() => navigate(routesMap.Dscensor.replace('/*', `/edit?id=${item._id}`))}
                    />
                ),
            })) || [],
        [data, navigate, onOpen],
    );

    const bgCard = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box w={'90%'} overflow={'hidden'}>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent borderRadius="md" boxShadow="xl">
                        <AlertDialogHeader
                            fontSize="lg"
                            fontWeight="bold"
                            borderBottomWidth="1px"
                            borderColor={borderColor}
                            pb={3}
                        >
                            Xóa Dscensor
                        </AlertDialogHeader>

                        <AlertDialogBody py={4}>
                            <Text>Bạn chắc chắn muốn xóa bản ghi này, hành động này không thể khôi phục.</Text>
                        </AlertDialogBody>

                        <AlertDialogFooter borderTopWidth="1px" borderColor={borderColor} pt={3}>
                            <Button ref={cancelRef} onClick={onClose} size="md" fontWeight="medium">
                                Hủy bỏ
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    if (!idDel) return;
                                    try {
                                        const res = await axios.delete(`/dscensor/${idDel}`);
                                        if (res.data.statusCode === HttpStatusCode.Ok) {
                                            toast({
                                                status: 'info',
                                                title: 'Bạn đã xóa thành công bản ghi',
                                            });
                                            refetch();
                                            setIdDel(null);
                                            onClose();
                                        }
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                                ml={3}
                                size="md"
                            >
                                Xóa
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Box
                bg={bgCard}
                borderRadius="lg"
                boxShadow="md"
                p={5}
                borderWidth="1px"
                borderColor={borderColor}
                w={'100%'}
                overflow={'hidden'}
            >
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading size="md">Dscensor Manager</Heading>
                    <Button
                        colorScheme="blue"
                        onClick={() => navigate(routesMap.Dscensor.replace('/*', '/new'))}
                        size="sm"
                    >
                        Thêm mới
                    </Button>
                </Flex>

                <TableContainer overflowX="auto" maxW={'95%'} overflowY={'hidden'}>
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr>
                                <Th w="12%">Sample Name</Th>
                                <Th w="8%">Gennus</Th>
                                <Th w="8%">Specis</Th>
                                <Th w="10%">Infraspecies</Th>
                                <Th w="8%">Scaffolds</Th>
                                <Th w="8%">Scaffolds N50</Th>
                                <Th w="10%">Assembly Bases</Th>
                                <Th w="8%">Gap Bases</Th>
                                <Th w="8%">Config Bases</Th>
                                <Th w="10%">Complete BUSCOs</Th>
                                <Th w="8%">Missing</Th>
                                <Th w="8%">Download</Th>
                                <Th w="10%"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dscensors.map((item: DscensorResType & { action: JSX.Element }) => (
                                <Tr key={item._id}>
                                    <Td whiteSpace="normal" wordBreak="break-word">
                                        {item.sample_name}
                                    </Td>
                                    <Td>{item.gennus}</Td>
                                    <Td>{item.specis}</Td>
                                    <Td whiteSpace="normal" wordBreak="break-word">
                                        {item.infraspecies}
                                    </Td>
                                    <Td>{item.scaffolds}</Td>
                                    <Td>{item.scaffolds_n50}</Td>
                                    <Td>{item.assembly_bases}</Td>
                                    <Td>{item.gap_bases}</Td>
                                    <Td>{item.config_bases}</Td>
                                    <Td>{item.complete_buscos}</Td>
                                    <Td>{item.missing}</Td>
                                    <Td>
                                        <a
                                            href={item.url_download}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'blue', textDecoration: 'underline' }}
                                        >
                                            Link
                                        </a>
                                    </Td>
                                    <Td>{item.action}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Manager;
