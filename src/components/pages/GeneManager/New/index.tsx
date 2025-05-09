import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GeneCreateType, GeneResType } from '../../../../type/gene';
import { useGetGene } from '../../../../services/gene/get-one';
import { useCreateGene } from '../../../../services/gene/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useUpdateGene } from '../../../../services/gene/update';
import { routesMap } from '../../../../routes/routes';
import { Box, Button, Divider, Flex, Grid, GridItem, HStack, Icon, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import BasicSelect from '../../../atoms/Select/BasicSelect';
import colors from '../../../../constants/colors';
import icons from '../../../../constants/icons';
import { useGetAllGeneFamily } from '../../../../services/geneFamily/get-all';
import { GeneFamilyResType } from '../../../../type/geneFamily';
import { useGetAllPanGeneSet } from '../../../../services/panGeneSet/get-all';
import { PanGeneSetResType } from '../../../../type/panGeneSet';
import { useGetStrains } from '../../../../services/strain/get-all';
import { StrainResType } from '../../../../type/strain';
import { useGetSpecies } from '../../../../services/species/get-all';
import { SpeciesResType } from '../../../../type/species';

const defaultValue = {
    name: '',
    arabidopsis_hit: '',
    description: '',
    gene_family: '',
    pan_gene_set: '',
    strain: '',
    go_terms: [''],
    species: '',
    identifier: {
        name: '',
        path_detail: '',
    },
    location: {
        name: '',
        path_detail: '',
    },
};

const New = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<GeneCreateType>(defaultValue);

    // Lấy thông tin gene 
    const { data } = useGetGene({
        id: searchParams.get('id') || '',
    });

    // Tạo gene 
    const create = useCreateGene({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Gene thành công',
                });
                setValue(defaultValue);
            },
            onError(error) {
                if (isAxiosError(error)) {
                    toast({
                        status: 'error',
                        title: getAxiosError(error),
                    });
                }
            },
        },
    });

    // Cập nhật gene 
    const update = useUpdateGene({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Edit Post thành công',
                });
                navigate(routesMap.Gene.replace('/*', '/manager'));
            },
            onError(error) {
                if (isAxiosError(error)) {
                    toast({
                        status: 'error',
                        title: getAxiosError(error),
                    });
                }
            },
        },
    });

    // Validate dữ liệu 
    const handleValidate = useCallback(() => {
        if (!value.name) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    // Tạo gene 
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) return;
        create.mutate(value);
    };

    // Cập nhật gene 
    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            ...value,
        });
    }, [data, value]);

    // Lấy danh sách họ gene 
    const { data: geneFamilyData } = useGetAllGeneFamily({});
    const geneFamilyOptions = useMemo(
        () =>
            geneFamilyData?.data?.map((item: GeneFamilyResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [geneFamilyData],
    );

    // Lấy danh sách PangeneSet 
    const { data: panGeneSetData } = useGetAllPanGeneSet({});
    const panGeneSetOptions = useMemo(
        () =>
            panGeneSetData?.data?.map((item: PanGeneSetResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [panGeneSetData],
    );

    // Lấy danh sách strain 
    const { data: strainData } = useGetStrains({});
    const strainOptions = useMemo(
        () =>
            strainData?.data?.map((item: StrainResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [strainData],
    );

    // Lấy danh sách species 
    const { data: speciesData } = useGetSpecies({});
    const speciesOptions = useMemo(
        () =>
            speciesData?.data?.map((item: SpeciesResType) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [speciesData],
    );

    // Set value khi có dữ liệu 
    useEffect(() => {
        if (data?.data) {
            const res = data.data as GeneResType;
            setValue({
                ...res,
            });
        }
    }, [data]);

    return (
        <HStack justifyContent="center">
            <Box w="80%" rounded={4} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                <Text textAlign="start" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                    {isEditPage ? 'Cập nhật Gene' : 'Tạo Gene'}
                </Text>
                <Divider borderWidth={1} mb={6} />
                <Grid templateColumns="repeat(2, 1fr)" gap={10} mb={10}>
                    {/* Input tên gene */}
                    <GridItem>
                        <BasicInput
                            label="Tên Gene"
                            placeholder="Nhập tên gene"
                            value={value.name}
                            onChange={(event) => {
                                setValue({ ...value, name: event.target.value });
                            }}
                        />
                    </GridItem>
                    {/* Input arabidopsis hit */}
                    <GridItem>
                        <BasicInput
                            label="arabidopsis hit"
                            placeholder="arabidopsis hit"
                            value={value.arabidopsis_hit}
                            onChange={(event) => {
                                setValue({ ...value, arabidopsis_hit: event.target.value });
                            }}
                        />
                    </GridItem>
                    {/* Input mô tả */}
                    <GridItem>
                        <BasicInput
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            value={value.description}
                            onChange={(event) => {
                                setValue({ ...value, description: event.target.value });
                            }}
                        />
                    </GridItem>
                    {/* Select họ gene */}
                    <GridItem>
                        <BasicSelect
                            label="gene_family"
                            placeholder="gene family"
                            onChange={(event) => {
                                setValue({ ...value, gene_family: event.target.value });
                            }}
                            options={geneFamilyOptions}
                            value={value.gene_family}
                        />
                    </GridItem>
                    {/* Select PangeneSet */}
                    <GridItem>
                        <BasicSelect
                            label="Pangene set"
                            placeholder="pangene set"
                            value={value.pan_gene_set}
                            onChange={(event) => {
                                setValue({ ...value, pan_gene_set: event.target.value });
                            }}
                            options={panGeneSetOptions}
                        />
                    </GridItem>
                    {/* Select strain */}
                    <GridItem>
                        <BasicSelect
                            label="strain"
                            placeholder="strain"
                            value={value.strain}
                            onChange={(event) => {
                                setValue({ ...value, strain: event.target.value });
                            }}
                            options={strainOptions}
                        />
                    </GridItem>
                    {/* Input mã định danh */}
                    <GridItem>
                        <Text fontWeight={500} fontSize={18} textTransform="capitalize" mb={2}>
                            Mã định danh
                        </Text>
                        <BasicInput
                            label="name"
                            placeholder="name"
                            value={value.identifier.name}
                            onChange={(event) => {
                                setValue({ ...value, identifier: { ...value.identifier, name: event.target.value } });
                            }}
                            mb={4}
                        />
                        <BasicInput
                            label="path detail"
                            placeholder="path detail"
                            value={value.identifier.path_detail}
                            onChange={(event) => {
                                setValue({
                                    ...value,
                                    identifier: { ...value.identifier, path_detail: event.target.value },
                                });
                            }}
                        />
                    </GridItem>
                    {/* Input vị trí */}
                    <GridItem>
                        <Text fontWeight={500} fontSize={18} textTransform="capitalize" mb={2}>
                            Vị trí
                        </Text>
                        <BasicInput
                            label="name"
                            placeholder="name"
                            value={value.location.name}
                            onChange={(event) => {
                                setValue({ ...value, location: { ...value.location, name: event.target.value } });
                            }}
                            mb={4}
                        />
                        <BasicInput
                            label="path detail"
                            placeholder="path detail"
                            value={value.location.path_detail}
                            onChange={(event) => {
                                setValue({
                                    ...value,
                                    location: { ...value.location, path_detail: event.target.value },
                                });
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <BasicSelect
                            label="species"
                            placeholder="species"
                            value={value.species}
                            onChange={(event) => {
                                setValue({ ...value, species: event.target.value });
                            }}
                            options={speciesOptions}
                        />
                    </GridItem>
                    <GridItem>
                        <Text mb={3}>Go</Text>
                        {value.go_terms.map((_, index) => {
                            return (
                                <Flex w="100%" justifyContent="space-between" gap={4}>
                                    <BasicInput
                                        key={index}
                                        label=""
                                        placeholder=""
                                        value={value.go_terms[index]}
                                        onChange={(event) => {
                                            setValue({
                                                ...value,
                                                go_terms: value.go_terms.map((data, indexChange) => {
                                                    if (indexChange === index) return event.target.value;
                                                    return data;
                                                }),
                                            });
                                        }}
                                    />
                                    <Button
                                        onClick={() =>
                                            setValue((prev) => ({
                                                ...prev,
                                                go_terms: value.go_terms.filter(
                                                    (_, indexChild) => index !== indexChild,
                                                ),
                                            }))
                                        }
                                    >
                                        <Icon as={icons.remove} />
                                    </Button>
                                </Flex>
                            );
                        })}
                        <HStack w="full" justifyContent="center" pt={4}>
                            <Button
                                onClick={() => setValue((prev) => ({ ...prev, go_terms: [...value.go_terms, ''] }))}
                                rounded="100%"
                                w="40px"
                                h="40px"
                            >
                                <Icon as={icons.add} />
                            </Button>
                        </HStack>
                    </GridItem>
                </Grid>
                {/* Button tạo hoặc cập nhật gene */}
                <Flex justifyContent="end">
                    <Button onClick={isEditPage ? handleEdit : handleCreate} bg={colors.brand} color="white">
                        {isEditPage ? 'Edit' : 'Create'}
                    </Button>
                </Flex>
            </Box>
        </HStack>
    );
};

export default New;
