import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';


const storageKey = 'depositorDetail'

export interface Deposit{
  accountNumber?: string,
  accountName?: string,
  bankName?: string,
  chqNumber?: string,
  amount?: string,
  depositorFullname?: string,
  depositorPhoneNumber?: string,
  depositorEmail?: string,
  narration?: string,
  singleDeposit?: boolean;
  selfdeposit?: string;
  proceedChk?: boolean;
  balance?: any;
  bookbalance?: any;
  accountbvn?: any;
  currencyCode?: string
}

export interface multiDeposit{
  accountInfo?: accountDetails[];
  depositorFullname?: string,
  depositorPhoneNumber?: string,
  depositorEmail?: string,
  narration?: string,
  multiDeposit?: boolean
}

export interface multiChqDeposit{
  accountInfo?: chqDetails[];
  accountNumber?: string,
  accountName?: string,
  depositorFullname?: string,
  depositorPhoneNumber?: string,
  depositorEmail?: string,
  narration?: string,
  selfdeposit?: string;
}

export interface chqDetails{
  issuingBank?: string,
  chqNumber?: string,  
  amount?: string,
  erroramount?: boolean,
}


export interface accountDetails{
  accountNumber?: string,
  erroraccountNumber?: boolean,
  accountName?: string,
  amount?: string,
  erroramount?: boolean,
  bankName?: string,
}

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(
    private storage: Storage
  ) {}

  store(data){
    return this.storage.set(storageKey, data)
  }

  get(){
    const subject = new Subject()
    this.storage.get(storageKey).then(data => {
      subject.next(data)
    })
    return subject.asObservable()
  }
}
