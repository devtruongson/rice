export type SpeciesCreateType = {
    name: string;
    gene_id: string[];
};

export type SpeciesResType = {
    _id: string;
} & SpeciesCreateType;
