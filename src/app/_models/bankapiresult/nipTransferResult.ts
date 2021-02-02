export interface nipTransferResult {
    linkedActivities: LinkedActivity[];
    header:           PokedexHeader;
    body:             PokedexBody;
}

export interface PokedexBody {
    beneficiaryAccountNo:    string;
    amount:                  string;
    channel:                 string;
    originatorBVN:           string;
    beneficiaryBVN:          string;
    beneficiaryAccountName:  string;
    originatorAccountNumber: string;
    narration:               string;
    nameEnquiryRef:          string;
    externalBankCode:        string;
    currency:                string;
    originatorAccountName:   string;
    channelCode:             string;
}

export interface PokedexHeader {
    transactionStatus: string;
    audit:             PurpleAudit;
    id:                string;
    status:            string;
}

export interface PurpleAudit {
    T24_time:           number;
    responseParse_time: number;
    requestParse_time:  number;
    versionNumber:      string;
}

export interface LinkedActivity {
    header: LinkedActivityHeader;
    body:   LinkedActivityBody;
}

export interface LinkedActivityBody {
    arrangementId: string;
    activityId:    string;
    productId:     string;
    currencyId:    string;
    effectiveDate: Date;
}

export interface LinkedActivityHeader {
    transactionStatus: string;
    audit:             FluffyAudit;
    id:                string;
    status:            string;
}

export interface FluffyAudit {
    versionNumber: string;
}
