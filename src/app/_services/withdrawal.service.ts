import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

const storageKey = 'WITHDRAWAL'

export interface Withdrawal{
  accountNo?: string,
  accountName?: string,
  amount?: number,
  balance?: number
}

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

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
