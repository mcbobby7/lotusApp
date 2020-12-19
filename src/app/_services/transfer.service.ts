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
  amount?: number,
  bank?: string
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
