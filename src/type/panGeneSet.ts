export type PanGeneSetCreateType = {
    name: string;
    path_detail: string;
};

export type PanGeneSetResType = { _id: string } & PanGeneSetCreateType;
