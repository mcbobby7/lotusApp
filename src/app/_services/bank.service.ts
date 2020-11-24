import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface BankAccount {
  number: string,
  name: string,
  balance: number
}

const banks: BankAccount[] = [
  {name: 'Sherrif Shorunke', number: '1111111111', balance: 100000},
  {name: 'Ridwan Adeleke', number: '1000000000', balance: 2000000}
]
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor() { }

  getBankByAccountNumber(accountNo: string){
    const subject = new Subject<BankAccount>()
    const bank = banks.find((bank: BankAccount) => bank.number == accountNo)
    window.setTimeout(()=> {
      if(bank){
        subject.next(bank)
      } else {
        subject.error({})
      }
      subject.complete()
    }, 2000)
    return subject
  }
}
