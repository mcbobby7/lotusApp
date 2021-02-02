export interface getBanksListResult {
    header: Header;
    body:   Body[];
}

export interface Body {
    institutionCode: string;
    institutionName: string;
}

export interface Header {
    audit:      Audit;
    page_start: number;
    page_token: string;
    total_size: number;
    page_size:  number;
    status:     string;
}

export interface Audit {
    T24_time:           number;
    responseParse_time: number;
    requestParse_time:  number;
}