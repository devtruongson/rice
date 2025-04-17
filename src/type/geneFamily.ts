export type GeneFamilyCreateType = {
    name: string;
    path_detail: string[];
};

export type GeneFamilyResType = {
    _id: string;
} & GeneFamilyCreateType;
