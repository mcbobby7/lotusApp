import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';


const storageKey = 'depositorDetail'

export interface Deposit{
  accountNumber?: string,
  bankName?: string,
  chqNumber?: string,
  amount?: string,
  depositorFullname?: string,
  depositorPhoneNumber?: string,
  depositorEmail?: string,
  narration?: string
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
