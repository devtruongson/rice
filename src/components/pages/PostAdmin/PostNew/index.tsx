import { Box, Button, Flex, Grid, GridItem, Text, Textarea } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { typePost } from '../../../../constants';
import { getAxiosError } from '../../../../libs/axios';
import toast from '../../../../libs/toast';
import { routesMap } from '../../../../routes/routes';
import { useCreatePost } from '../../../../services/post/create';
import { useGetPost } from '../../../../services/post/get-one';
import { useUpdatePost } from '../../../../services/post/update';
import { CreatePostType, PostType } from '../../../../type/post';
import BasicInput from '../../../atoms/Input/BasicInput';
import BasicSelect from '../../../atoms/Select/BasicSelect';

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
        <Box bg="white" borderWidth="1px" borderRadius="lg" boxShadow="md" p={8}>
            <Text textAlign="center" fontSize={24} fontWeight="bold" color="gray.800" textTransform="uppercase" mb={6}>
                {isEditPage ? 'Edit' : 'Create'}
            </Text>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} mb={10}>
                <GridItem>
                    <BasicInput
                        label="title"
                        placeholder="Nhập tên bài viết ...."
                        value={value.title}
                        onChange={(event) => setValue({ ...value, title: event.target.value })}
                    />
                </GridItem>
                <GridItem>
                    <BasicInput
                        label="sub title"
                        placeholder="Nhập sub title cho bài viết của bạn ...."
                        value={value.sub_title}
                        onChange={(event) => setValue({ ...value, sub_title: event.target.value })}
                    />
                </GridItem>
                <GridItem>
                    <BasicInput
                        label="author"
                        placeholder="Nhập tên tác giả của bạn ..."
                        value={value.author}
                        onChange={(event) => setValue({ ...value, author: event.target.value })}
                    />
                </GridItem>
                <GridItem>
                    <BasicSelect
                        label="Paper type"
                        placeholder="choose type"
                        value={value.type}
                        options={typePost}
                        onChange={(event) => setValue({ ...value, type: event.target.value })}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
                        Description
                    </Text>
                    <Textarea
                        placeholder="Nhập mô tả cho bài viết của bạn....."
                        value={value.description}
                        onChange={(e) => setValue({ ...value, description: e.target.value })}
                        rows={5}
                        resize="vertical"
                    />
                </GridItem>
            </Grid>
            <Flex justifyContent="end">
                <Button
                    onClick={isEditPage ? handleEdit : handleCreate}
                    colorScheme="blue"
                    w={{ base: 'full', md: 'auto' }}
                >
                    {isEditPage ? 'Edit' : 'Create'}
                </Button>
            </Flex>
        </Box>
    );
};

export default PostNew;
