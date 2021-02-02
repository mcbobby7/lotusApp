export interface getAllAccountDetailsResult {
    header: Header;
    body:   Body[];
}

export interface Body {
    gender:               string;
    accountName:          string;
    accountCategory:      string;
    shortAccount:         string;
    dateOfBirth:          string;
    sortCode:             string;
    categoryDescription:  string;
    accountStatus:        string;
    longAccount:          string;
    accountManager:       string;
    isAccountChequeValid: boolean;
    bvn:                  string;
    accountBalance:       string;
    bookBalance:          string;
    currencyCode:         string;
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




