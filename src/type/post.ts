export type PostType = {
    _id: string;
    title: string;
    sub_title: string;
    author: string;
    description: string;
    createdAt: string;
    path: string;
    type: string;
};

export type CreatePostType = Pick<PostType, 'title' | 'sub_title' | 'author' | 'description' | 'type'>;
export type UpdatePostType = Pick<PostType, 'title' | 'sub_title' | 'author' | 'description' | 'type' | '_id'>;
