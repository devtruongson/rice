import { Box, Button, Flex, Grid, GridItem, Text, Textarea } from '@chakra-ui/react';
import BasicInput from '../../../atoms/Input/BasicInput';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CreatePostType, PostType } from '../../../../type/post';
import BasicSelect from '../../../atoms/Select/BasicSelect';
import { typePost } from '../../../../constants';
import { useCreatePost } from '../../../../services/post/create';
import toast from '../../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../../libs/axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPost } from '../../../../services/post/get-one';
import { useUpdatePost } from '../../../../services/post/update';
import { routesMap } from '../../../../routes/routes';

const defaultValue = {
    title: '',
    sub_title: '',
    author: '',
    description: '',
    type: '',
};
const PostNew = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const isEditPage = useMemo(() => pathname.includes('/edit'), [pathname]);
    const [value, setValue] = useState<CreatePostType>(defaultValue);

    const { data } = useGetPost({
        id: searchParams.get('id') || '',
    });

    const create = useCreatePost({
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

    const update = useUpdatePost({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: 'success',
                    title: 'Edit Post thành công',
                });
                navigate(routesMap.PostAdmin.replace('/*', '/manager'));
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
        if (!value.title || !value.sub_title || !value.description || !value.type) {
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
            const post = data.data as PostType;
            // console.log(post);
            setValue({
                title: post?.title || '',
                sub_title: post?.sub_title || '',
                author: post?.author || '',
                description: post?.description || '',
                type: post?.type || '',
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
                        label="title"
                        placeholder="title"
                        value={value.title}
                        onChange={(event) => {
                            setValue({ ...value, title: event.target.value });
                        }}
                    />
                </GridItem>
                <GridItem>
                    <BasicInput
                        label="sub title"
                        placeholder="sub title"
                        value={value.sub_title}
                        onChange={(event) => {
                            setValue({ ...value, sub_title: event.target.value });
                        }}
                    />
                </GridItem>
                <GridItem>
                    <BasicInput
                        label="author"
                        placeholder="author"
                        value={value.author}
                        onChange={(event) => {
                            setValue({ ...value, author: event.target.value });
                        }}
                    />
                </GridItem>
                <GridItem>
                    <BasicSelect
                        label="type"
                        placeholder="choose type"
                        value={value.type}
                        options={typePost}
                        onChange={(event) => {
                            setValue({ ...value, type: event.target.value });
                        }}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text mb={3}>Description</Text>
                    <Textarea
                        placeholder="description"
                        value={value.description}
                        onChange={(e) => setValue({ ...value, description: e.target.value })}
                    />
                </GridItem>
            </Grid>
            <Flex justifyContent="end">
                <Button onClick={isEditPage ? handleEdit : handleCreate}>{isEditPage ? 'Edit' : 'Create'}</Button>
            </Flex>
        </Box>
    );
};

export default PostNew;
