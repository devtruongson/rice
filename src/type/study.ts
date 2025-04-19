export type StudyCreateType = {
    study_name: string;
    link_detail_study: string;
    study_type: string;
    publication_id: string;
    author: string;
    synopsis: string;
    description: string;
    genotypes: string;
};

export type StudyResType = {
    _id: string;
} & StudyCreateType;
