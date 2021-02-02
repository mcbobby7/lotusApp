export interface postIntraTransferResult {
    header: Header;
    body:   Body;
}

export interface Body {
    amount:        number;
    debitAccount:  string;
    creditAccount: string;
    narration:     string;
    channel:       string;
    currency:      string;
}

export interface Header {
    transactionStatus: string;
    audit:             Audit;
    id:                string;
    status:            string;
}

export interface Audit {
    T24_time:           number;
    responseParse_time: number;
    requestParse_time:  number;
    versionNumber:      string;
}
