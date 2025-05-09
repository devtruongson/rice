import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { JSX, useMemo } from 'react';
import { FaChartBar, FaCopy } from 'react-icons/fa';
import axios, { getAxiosError } from '../../../libs/axios';
import MainTemPlate from '../../templates/MainTemPlate';

type DscensorResType = {
    _id: string;
    sample_name: string;
    genus: string;
    species: string;
    infraspecies: string;
    scaffolds: number;
    scaffolds_n50: number;
    assembly_bases: number;
    gap_bases: number;
    contig_bases: number;
    complete_buscos: number;
    missing: number;
    url_download: string;
};

const fetchDscensors = async () => {
    try {
        const response = await axios.get('/dscensor');
        return response.data.data as DscensorResType[];
    } catch (error) {
        throw new Error(getAxiosError(error as Error));
    }
};

export default function DscensorClient() {
    // Lấy danh sách dscensor 
    const { data: dscensors, isLoading } = useQuery({
        queryKey: ['dscensors'],
        queryFn: fetchDscensors,
    });

    // Build data table 
    const processedDscensors = useMemo(() => {
        return (
            dscensors?.map((item: DscensorResType) => ({
                ...item,
                download: (
                    <a
                        href={item.url_download}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#3182ce', textDecoration: 'underline' }}
                    >
                        Download
                    </a>
                ),
            })) || []
        );
    }, [dscensors]);

    if (isLoading) {
        return (
            <MainTemPlate>
                <Box>Loading...</Box>
            </MainTemPlate>
        );
    }

    return (
        <MainTemPlate>
            <Box p={4}>
                {/* Header Section */}
                <Heading size="md" mb={2}>
                    DSMetrics
                </Heading>
                <Box fontSize="sm" color="gray.600" mb={4}>
                    DSMetrics: Đánh giá chuẩn các Ortholog bản sao đơn phổ biến (BUSCO).
                </Box>

                {/* Toolbar Section */}
                <HStack spacing={2} mb={4}>
                    <IconButton
                        aria-label="Copy table"
                        icon={<FaCopy />}
                        size="sm"
                        variant="outline"
                        borderColor="gray.300"
                    />
                    <Button leftIcon={<FaChartBar />} size="sm" variant="outline" borderColor="gray.300">
                        Kịch bản
                    </Button>
                    <Box fontSize="sm" color="gray.600">
                        Showing {processedDscensors.length} rows and ~ {Object.keys(processedDscensors[0] || {}).length}{' '}
                        columns.
                    </Box>
                </HStack>

                {/* Table Section */}   
                <TableContainer border="1px solid" borderColor="gray.200" borderRadius="md" overflowX="auto">
                    {/* Table dscensor */}
                    <Table variant="simple" size="sm" colorScheme="gray">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="12%"
                                >
                                    Tên mẫu
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                >
                                    Chi
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                >
                                    Giống loài
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="10%"
                                >
                                    Infraspecies
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                    textAlign="right"
                                >
                                    Scaffolds
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                    textAlign="right"
                                    bg="blue.50"
                                >
                                    Scaffold N50
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="10%"
                                    textAlign="right"
                                    bg="blue.50"
                                >
                                    Assembly Bases
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                    textAlign="right"
                                >
                                    Gap Bases
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                    textAlign="right"
                                >
                                    Contig Bases
                                </Th>
                                <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="10%"
                                    textAlign="right"
                                    bg="blue.50"
                                >
                                    Complete BUSCOs
                                </Th>
                                {/* <Th
                                    borderRight="1px solid"
                                    borderColor="gray.200"
                                    textTransform="uppercase"
                                    fontSize="xs"
                                    py={2}
                                    w="8%"
                                    textAlign="right"
                                >
                                    Missing
                                </Th> */}
                                <Th textTransform="uppercase" fontSize="xs" py={2} w="8%">
                                    Tải xuống
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {processedDscensors.map(
                                (
                                    item: DscensorResType & {
                                        download: JSX.Element;
                                    },
                                ) => {
                                    return (
                                        <Tr key={item._id}>
                                            <Td
                                                borderRight="1px solid"
                                                borderColor="gray.200"
                                                whiteSpace="normal"
                                                wordBreak="break-word"
                                            >
                                                {item.sample_name}
                                            </Td>
                                            <Td borderRight="1px solid" borderColor="gray.200">
                                                {item.genus as string}
                                            </Td>
                                            <Td borderRight="1px solid" borderColor="gray.200">
                                                {item.species}
                                            </Td>
                                            <Td
                                                borderRight="1px solid"
                                                borderColor="gray.200"
                                                whiteSpace="normal"
                                                wordBreak="break-word"
                                            >
                                                {item.infraspecies}
                                            </Td>
                                            <Td borderRight="1px solid" borderColor="gray.200" textAlign="right">
                                                {item.scaffolds}
                                            </Td>
                                            <Td
                                                borderRight="1px solid"
                                                borderColor="gray.200"
                                                textAlign="right"
                                                bg="blue.50"
                                            >
                                                {item.scaffolds_n50}
                                            </Td>
                                            <Td
                                                borderRight="1px solid"
                                                borderColor="gray.200"
                                                textAlign="right"
                                                bg="blue.50"
                                            >
                                                {item.assembly_bases}
                                            </Td>
                                            <Td borderRight="1px solid" borderColor="gray.200" textAlign="right">
                                                {item.gap_bases}
                                            </Td>
                                            <Td borderRight="1px solid" borderColor="gray.200" textAlign="right">
                                                {item.contig_bases}
                                            </Td>
                                            <Td
                                                borderRight="1px solid"
                                                borderColor="gray.200"
                                                textAlign="right"
                                                bg="blue.50"
                                            >
                                                {item.complete_buscos}
                                            </Td>
                                            {/* <Td borderRight="1px solid" borderColor="gray.200" textAlign="right">
                                                {item.missing}
                                            </Td> */}
    
                                            <Td>{item.download}</Td>
                                        </Tr>
                                    );
                                },
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </MainTemPlate>
    );
}
