export interface ICity {
    name?: string;
    code?: number;
    division_type?: string;
    codename?: string;
    phone_code?: number;
    districts: IDistrict[];
}
export interface IDistrict {
    name?: string;
    code?: number;
    division_type?: string;
    codename?: string;
    province_code?: number;
    wards?: unknown[];
}
