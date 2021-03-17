export enum ALERT_TYPES {
    SUCCESS = 'success',
    FAILED = 'danger',
    COPIED = 'copied',
  }


export interface intratransferM{
  body?: intratransDetail
}

export interface intratransDetail{
  debitAccount?: any, 
  amount?: number,
  currency?: string, 
  creditAccount?: any, 
  channel?: string, 
  narration?: string
}

export interface nipenquiry{
  destinationInstitutionCode?:any,
  accountNumber?: any,
  ChannelCode?: string
}
export interface niptransfer {
  body?: transferbody
 }

export interface transferbody{
  externalBankCode?: any,
  beneficiaryAccountNo?: any,
  currency?: string,
  amount?: number,
  nameEnquiryRef?: string, 
  channelCode?: string,
  beneficiaryAccountName?: any, 
  channel?: string, 
  beneficiaryBVN?: any, 
  narration?: string,
  originatorAccountNumber?: any
}

export interface cashdepositM{
  body?:cashdepositbody
}

export interface cashdepositbody{
  denominationValues?: denomination[];
  depositAmount?: number,
  creditAccount?: number,
  narrative?: string,
  documentNo?: number,
  channel?: string
}

export interface denomination{
  denomination: any,
  unit: number
}

export interface inwardchqPost{
body:inwardchqPostbody
}

export interface inwardchqPostbody{
  chequeNo: number,
  debitAccount: number,
  amount: number,
  currency:string,
  narration: string
}

