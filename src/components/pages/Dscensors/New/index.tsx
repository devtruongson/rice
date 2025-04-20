import { Box, Button, Flex, FormControl, Grid, GridItem, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios, { getAxiosError } from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { DscensorReqType, DscensorResType } from '../../../../type/dscensor';
import BasicInput from '../../../atoms/Input/BasicInput';

const defaultValue: DscensorReqType = {
    sample_name: '',
    gennus: '',
    specis: '',
    infraspecies: '',
    scaffolds: '',
    scaffolds_n50: '',
    assembly_bases: '',
    gap_bases: '',
    config_bases: '',
    complete_buscos: '',
    missing: '',
    url_download: '',
};

const New = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<DscensorReqType>(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDscensor = async (id: string) => {
        try {
            const response = await axios.get(`/dscensor/${id}`);
            if (response.data && response.data.data) {
                const dscensorData = response.data.data as DscensorResType;
                setValue({
                    sample_name: dscensorData.sample_name || '',
                    gennus: dscensorData.gennus || '',
                    specis: dscensorData.specis || '',
                    infraspecies: dscensorData.infraspecies || '',
                    scaffolds: dscensorData.scaffolds || '',
                    scaffolds_n50: dscensorData.scaffolds_n50 || '',
                    assembly_bases: dscensorData.assembly_bases || '',
                    gap_bases: dscensorData.gap_bases || '',
                    config_bases: dscensorData.config_bases || '',
                    complete_buscos: dscensorData.complete_buscos || '',
                    missing: dscensorData.missing || '',
                    url_download: dscensorData.url_download || '',
                });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast({
                    status: 'error',
                    title: getAxiosError(error),
                });
            }
        }
    };

    useEffect(() => {
        const id = searchParams.get('id');
        if (isEditPage && id) {
            fetchDscensor(id);
        }
    }, [isEditPage, searchParams]);

    const handleValidate = useCallback(() => {
        if (!value.sample_name || !value.gennus || !value.specis) {
            toast({ status: 'warning', title: 'Vui lòng điền các thông tin bắt buộc' });
            return false;
        }
        return true;
    }, [value]);

    const handleCreate = async () => {
        const isValid = handleValidate();
        if (!isValid) return;

        setIsLoading(true);
        try {
            const response = await axios.post('/dscensor', value);
            if (response.status === 201) {
                toast({
                    status: 'success',
                    title: 'Tạo Dscensor thành công',
                });
                setValue(defaultValue);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast({
                    status: 'error',
                    title: getAxiosError(error),
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        const isValid = handleValidate();
        if (!isValid) return;

        const id = searchParams.get('id');
        if (!id) return;

        setIsLoading(true);
        try {
            const response = await axios.put(`/dscensor/`, {
                _id: id,
                ...value,
            });
            if (response.status === 200) {
                toast({
                    status: 'success',
                    title: 'Cập nhật Dscensor thành công',
                });
                navigate(routesMap.Dscensor.replace('/*', '/manager'));
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast({
                    status: 'error',
                    title: getAxiosError(error),
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const bgCard = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box
            bg={bgCard}
            borderRadius="lg"
            boxShadow="md"
            p={6}
            borderWidth="1px"
            borderColor={borderColor}
            maxWidth="1000px"
            mx="auto"
        >
            <VStack spacing={6} align="stretch">
                <Heading
                    as="h2"
                    size="md"
                    textAlign="center"
                    textTransform="uppercase"
                    pb={2}
                    borderBottomWidth="1px"
                    borderColor={borderColor}
                >
                    {isEditPage ? 'Edit Dscensor' : 'Create New Dscensor'}
                </Heading>

                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                    <GridItem>
                        <FormControl isRequired>
                            <BasicInput
                                label="Sample Name"
                                placeholder="Enter sample name"
                                value={value.sample_name}
                                onChange={(event) => {
                                    setValue({ ...value, sample_name: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isRequired>
                            <BasicInput
                                label="Gennus"
                                placeholder="Enter gennus"
                                value={value.gennus}
                                onChange={(event) => {
                                    setValue({ ...value, gennus: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isRequired>
                            <BasicInput
                                label="Specis"
                                placeholder="Enter specis"
                                value={value.specis}
                                onChange={(event) => {
                                    setValue({ ...value, specis: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Infraspecies"
                                placeholder="Enter infraspecies"
                                value={value.infraspecies}
                                onChange={(event) => {
                                    setValue({ ...value, infraspecies: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Scaffolds"
                                placeholder="Enter scaffolds"
                                value={value.scaffolds}
                                onChange={(event) => {
                                    setValue({ ...value, scaffolds: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Scaffolds N50"
                                placeholder="Enter scaffolds N50"
                                value={value.scaffolds_n50}
                                onChange={(event) => {
                                    setValue({ ...value, scaffolds_n50: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Assembly Bases"
                                placeholder="Enter assembly bases"
                                value={value.assembly_bases}
                                onChange={(event) => {
                                    setValue({ ...value, assembly_bases: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Gap Bases"
                                placeholder="Enter gap bases"
                                value={value.gap_bases}
                                onChange={(event) => {
                                    setValue({ ...value, gap_bases: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Config Bases"
                                placeholder="Enter config bases"
                                value={value.config_bases}
                                onChange={(event) => {
                                    setValue({ ...value, config_bases: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Complete BUSCOs"
                                placeholder="Enter complete BUSCOs"
                                value={value.complete_buscos}
                                onChange={(event) => {
                                    setValue({ ...value, complete_buscos: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="Missing"
                                placeholder="Enter missing"
                                value={value.missing}
                                onChange={(event) => {
                                    setValue({ ...value, missing: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <BasicInput
                                label="URL Download"
                                placeholder="Enter download URL"
                                value={value.url_download}
                                onChange={(event) => {
                                    setValue({ ...value, url_download: event.target.value });
                                }}
                            />
                        </FormControl>
                    </GridItem>
                </Grid>

                <Flex justify="space-between" pt={4} borderTopWidth="1px" borderColor={borderColor}>
                    <Button variant="outline" onClick={() => navigate(routesMap.Dscensor.replace('/*', '/manager'))}>
                        Hủy
                    </Button>

                    <Button onClick={isEditPage ? handleEdit : handleCreate} isLoading={isLoading}>
                        {isEditPage ? 'Lưu thay đổi' : 'Tạo mới'}
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};

export default New;
