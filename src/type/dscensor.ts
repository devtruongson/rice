// file: src/type/dscensor.ts

export interface DscensorResType {
    _id: string;
    sample_name: string;
    gennus: string;
    specis: string;
    infraspecies: string;
    scaffolds: string;
    scaffolds_n50: string;
    assembly_bases: string;
    gap_bases: string;
    config_bases: string;
    complete_buscos: string;
    missing: string;
    url_download: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface DscensorReqType {
    sample_name: string;
    gennus: string;
    specis: string;
    infraspecies: string;
    scaffolds: string;
    scaffolds_n50: string;
    assembly_bases: string;
    gap_bases: string;
    config_bases: string;
    complete_buscos: string;
    missing: string;
    url_download: string;
}

export interface DscensorPaginateResType {
    data: DscensorResType[];
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}

export interface DscensorQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}
