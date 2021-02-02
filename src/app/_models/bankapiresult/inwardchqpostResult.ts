export interface inwardchqpostResult {
    linkedActivities: LinkedActivity[];
    header:           Header;
    body:             Body;
}

export interface Body {
    amountCredited:  string;
    amount:          string;
    debitValueDate:  string;
    debitAccount:    string;
    chequeNo:        string;
    narration:       string;
    creditValueDate: string;
    amountDebited:   string;
    currency:        string;
}

export interface Header {
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
