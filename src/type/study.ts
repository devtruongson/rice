export type StudyCreateType = {
    study_name: string;
    link_detail_study: string;
    study_type: string;
    publication_id: string;
    author: string;
    synopsis: string;
    description: string;
    genotypes: string;
    species: string;
    traits: string;
};

export type StudyUpdateType = {
    _id: string;
} & StudyCreateType;

export type StudyResType = {
    _id: string;
    species: {
        _id: string;
        name: string;
    };
} & StudyCreateType;
