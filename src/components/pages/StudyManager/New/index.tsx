import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetStudy } from '../../../../services/study/get-one';
import { useCreateStudy } from '../../../../services/study/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useUpdateStudy } from '../../../../services/study/update';
import { routesMap } from '../../../../routes/routes';
import { StudyUpdateType } from '../../../../type/study';
import { Box, Button, Divider, Flex, Grid, GridItem, HStack, Text, Textarea } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import colors from '../../../../constants/colors';
import BasicSelect from '../../../atoms/Select/BasicSelect';
import { useGetSpecies } from '../../../../services/species/get-all';
import { SpeciesResType } from '../../../../type/species';

const defaultValue = {
    study_name: '',
    link_detail_study: '',
    study_type: '',
    publication_id: '',
    author: '',
    synopsis: '',
    description: '',
    genotypes: '',
    species: '',
    traits: '',
};
const New = () => {
    const [value, setValue] = useState(defaultValue);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);

    // Lấy thông tin study 
    const { data } = useGetStudy({
        id: searchParams.get('id') || '',
    });

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

    // Tạo study 
    const create = useCreateStudy({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Study thành công',
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

    // Cập nhật study 
    const update = useUpdateStudy({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
                navigate(routesMap.Study.replace('/*', '/manager'));
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
        if (
            !value.author ||
            !value.study_name ||
            !value.study_type ||
            !value.link_detail_study ||
            !value.publication_id ||
            !value.description ||
            !value.genotypes ||
            !value.synopsis
        ) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    // Tạo study 
    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

        create.mutate(value);
    };

    // Cập nhật study 
    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            ...value,
        });
    }, [data, value]);

    // Set value khi có dữ liệu 
    useEffect(() => {
        if (data?.data) {
            const study = data.data as StudyUpdateType;
            setValue({
                ...study,
            });
        }
    }, [data]);

    return (
        <HStack justifyContent="center">
            <Box w="80%" rounded={4} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                <Text textAlign="start" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                    {isEditPage ? 'Cập nhật' : 'Tạo nghiên cứu'}
                </Text>
                <Divider borderWidth={1} />
                <Grid templateColumns="repeat(2, 1fr)" gap={10} mb={10} pt={4} px={6}>
                    <GridItem>
                        {/* Input tên nghiên cứu */}
                        <BasicInput
                            label="Tên nghiên cứu"
                            placeholder="Nhập tên nghiên cứu"
                            value={value.study_name}
                            onChange={(event) => {
                                setValue({ ...value, study_name: event.target.value });
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Input link chi tiết nghiên cứu */}
                        <BasicInput
                            label="Link chi tiết nghiên cứu"
                            placeholder="Nhập link chi tiết nghiên cứu"
                            value={value.link_detail_study}
                            onChange={(event) => {
                                setValue({ ...value, link_detail_study: event.target.value });
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Select loại hình nghiên cứu */}
                        <BasicSelect
                            label="Loại hình nghiên cứu"
                            placeholder="Nhập loại hình nghiên cứu"
                            value={value.study_type}
                            onChange={(event) => {
                                setValue({ ...value, study_type: event.target.value });
                            }}
                            options={[
                                { value: 'GWAS', label: 'GWAS' },
                                { value: 'QTL', label: 'QTL' },
                            ]}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Select species */}
                        <BasicSelect
                            label="Species"
                            placeholder="Nhập species"
                            value={value.species}
                            onChange={(event) => {
                                setValue({ ...value, species: event.target.value });
                            }}
                            options={speciesOptions}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Input Id xuất bản */}
                        <BasicInput
                            label="Id xuất bản"
                            placeholder="Nhập Id xuất bản"
                            value={value.publication_id}
                            onChange={(event) => {
                                setValue({ ...value, publication_id: event.target.value });
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Input tác giả */}
                        <BasicInput
                            label="Tác giả"
                            placeholder="Nhập tác giả"
                            value={value.author}
                            onChange={(event) => {
                                setValue({ ...value, author: event.target.value });
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Input đặc điểm */}
                        <BasicInput
                            label="Đặc điểm"
                            placeholder="Nhập đặc điểm"
                            value={value.traits}
                            onChange={(event) => {
                                setValue({ ...value, traits: event.target.value });
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        {/* Input kiểu gene */}
                        <BasicInput
                            label="Kiểu gene"
                            placeholder="Nhập Kiểu gene"
                            value={value.genotypes}
                            onChange={(event) => {
                                setValue({ ...value, genotypes: event.target.value });
                            }}
                        />
                    </GridItem>

                    <GridItem>
                        {/* Textarea mô tả */}
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
                            Mô tả
                        </Text>
                        <Textarea
                            placeholder="Nhập mô tả"
                            value={value.description}
                            onChange={(e) => setValue({ ...value, description: e.target.value })}
                            rows={5}
                            resize="vertical"
                        />
                    </GridItem>
                    <GridItem>
                        {/* Textarea tóm tắt */}
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
                            Tóm tắt
                        </Text>
                        <Textarea
                            placeholder="Nhập nội dung tóm tắt"
                            value={value.synopsis}
                            onChange={(e) => setValue({ ...value, synopsis: e.target.value })}
                            rows={5}
                            resize="vertical"
                        />
                    </GridItem>
                </Grid>
                <Flex justifyContent="end">
                    {/* Button lưu thay đổi hoặc tạo */}
                    <Button onClick={isEditPage ? handleEdit : handleCreate} bg={colors.brand} color="white">
                        {isEditPage ? 'Luuw thay đổi' : 'Tạo'}
                    </Button>
                </Flex>
            </Box>
        </HStack>
    );
};

export default New;
