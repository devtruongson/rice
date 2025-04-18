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
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';

const defaultValue = {
    name: '',
    arabidopsis_hit: '',
    go_terms: [],
    identifier: {
        name: '',
        path_detailo: [],
    },
    location: {
        name: '',
        path_detail: [],
    },
    description: '',
    gene_family: '',
    pan_gene_set: '',
    genus: '',
    species: [],
    strain: '',
};

const New = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<GeneCreateType>(defaultValue);

    const { data } = useGetGene({
        id: searchParams.get('id') || '',
    });

    const create = useCreateGene({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Tạo Post thành công',
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

    const handleValidate = useCallback(() => {
        if (!value.name) {
            toast({ status: 'warning', title: 'Vui lòng điền đủ thông tin' });
            return false;
        }
        return true;
    }, [value]);

    const handleCreate = () => {
        const isValid = handleValidate();
        if (!isValid) return;
        create.mutate(value);
    };

    const handleEdit = useCallback(() => {
        const isValid = handleValidate();
        if (!isValid || !data?.data?._id) return;
        update.mutate({
            _id: data?.data?._id,
            ...value,
        });
    }, [data, value]);

    useEffect(() => {
        if (data?.data) {
            const res = data.data as GeneResType;
            setValue({
                ...res,
            });
        }
    }, [data]);

    return (
        <Box>
            <Text textAlign="center" fontSize={20} fontWeight={500} textTransform="uppercase" mb={8}>
                {isEditPage ? 'Edit' : 'Create'}
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} mb={10}>
                <GridItem>
                    <BasicInput
                        label="name"
                        placeholder="name"
                        value={value.name}
                        onChange={(event) => {
                            setValue({ ...value, name: event.target.value });
                        }}
                    />
                </GridItem>
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
                <GridItem>
                    <BasicInput
                        label="description"
                        placeholder="description"
                        value={value.description}
                        onChange={(event) => {
                            setValue({ ...value, description: event.target.value });
                        }}
                    />
                </GridItem>
            </Grid>
            <Flex justifyContent="end">
                <Button onClick={isEditPage ? handleEdit : handleCreate}>{isEditPage ? 'Edit' : 'Create'}</Button>
            </Flex>
        </Box>
    );
};

export default New;
