export interface intratransferM{
  body: intratransDetail
}

export interface intratransDetail{
  debitAccount: number, 
  amount: number,
  currency: string, 
  creditAccount: number, 
  channel: string, 
  narration: string
}

export interface nipenquiry{
  destinationInstitutionCode:number,
  accountNumber: number,
  ChannelCode: string
}
export interface niptransfer {
  body: transferbody
 }

export interface transferbody{
  externalBankCode: number,
  beneficiaryAccountNo: number,
  currency: string,
  amount: number,
  nameEnquiryRef: string, 
  channelCode: string,
  beneficiaryAccountName: number, 
  channel: string, 
  beneficiaryBVN: number, 
  narration: string,
   originatorAccountNumber: number
}

export interface cashdepositM{
  body:cashdepositbody
}

export interface cashdepositbody{
  denominationValues: denomination[];
  depositAmount: number,
  creditAccount: number,
  narrative: string,
  documentNo: number,
  channel: string
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