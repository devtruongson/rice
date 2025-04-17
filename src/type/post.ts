export type CreatePostType = {
    title: string;
    sub_title: string;
    author: string;
    description: string;
    type: string;
};

export type UpdatePostType = {
    _id: string;
} & CreatePostType;

export type PostType = {
    createdAt: string;
    path: string;
} & UpdatePostType;
