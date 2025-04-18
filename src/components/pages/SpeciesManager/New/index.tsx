import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetSpeci } from '../../../../services/species/get-one';
import { useCreateSpecies } from '../../../../services/species/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useUpdateSpecies } from '../../../../services/species/update';
import { routesMap } from '../../../../routes/routes';
import { SpeciesResType } from '../../../../type/species';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import { Select, SingleValue } from 'chakra-react-select';
import { useGetGenes } from '../../../../services/gene/get-genes';
import { GeneResType } from '../../../../type/gene';
import { OptionType } from '../../../../type';

const defaultValue = {
    name: '',
    gene_id: [] as string[],
};

const New = () => {
    const [value, setValue] = useState(defaultValue);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [options, setOptions] = useState<OptionType[]>([]);
    const [inputText, setInputText] = useState('');

    const { data } = useGetSpeci({
        id: searchParams.get('id') || '',
    });

    const create = useCreateSpecies({
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

    const update = useUpdateSpecies({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Success',
                });
                navigate(routesMap.Species.replace('/*', '/manager'));
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
        if (!isValid) {
            return;
        }

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
            const species = data.data as SpeciesResType;
            setValue({
                name: species?.name || '',
                gene_id: species?.gene_id || [],
            });
        }
    }, [data]);

    const handleChange = (option: SingleValue<OptionType>) => {
        setValue({ ...value, gene_id: option.map((item: OptionType) => item.value) });
    };

    const handleInputChange = (newValue: string, { action }: { action: string }) => {
        if (action === 'input-change') {
            setInputText(newValue);
            setOptions([]);
        }
    };

    const { data: geneData } = useGetGenes({ rest: { page: 1, pageSize: 10 } });
    useEffect(() => {
        const newData = geneData?.data?.data;
        if (newData?.length) {
            const newOptions = newData.map((item: GeneResType) => ({ value: item._id, label: item?.name }));
            setOptions((prev) => [...prev, ...newOptions]);
        }
    }, [geneData]);

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
                    <Text mb={3} textTransform="capitalize">
                        Chọn gene
                    </Text>
                    <Select
                        isMulti
                        options={options}
                        placeholder="Chọn nhiều giá trị..."
                        onChange={handleChange}
                        inputValue={inputText}
                        onInputChange={handleInputChange}
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
