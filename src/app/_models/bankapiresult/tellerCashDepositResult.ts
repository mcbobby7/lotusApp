
export interface tellerCashDepositResult {
    header: Header;
    body:   Body;
}

export interface Body {
    depositAmount:      string;
    creditAccount:      string;
    narrative:          string;
    channel:            string;
    teller:             string;
    denominationValues: DenominationValue[];
    transactionCode:    string;
    valueDate:          string;
    "dr/crMarker":      string;
    netCredit:          string;
    internalAccount:    string;
    documentNo:         string;
    waiveCharges:       string;
    newCustBal:         string;
    currency:           string;
    customer:           string;
}

export interface DenominationValue {
    unit:         string;
    denomination: string;
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
