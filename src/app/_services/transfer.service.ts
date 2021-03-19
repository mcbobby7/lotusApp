import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

export interface FundTransfer{
  transferType?: string,
  accountNo?: string,
  accountName?: string,
  balance?: number,
  toAccountNo?: string,
  toAccountName?: string,
  currencyCode?: string,
  tobank?: string,
  tobankCode?:any,
  amount?: any,
  bank?: string,
  correspondingBank?: string,
  narration?: string,
  swiftCode?: string,
  routingNumber?: string,
  NameEnquiryRef?: string,
  beneficiaryaccountbvn?: string,
  correspondentSwiftCode?: string,
  correspondentRoutingNumber?: string,
}

const storageKey = 'fund-transfer'

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(
    private storage: Storage
  ) { }

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
