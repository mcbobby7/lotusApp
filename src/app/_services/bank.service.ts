import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface BankAccount {
  number: string,
  name: string
}

const banks: BankAccount[] = [
  {name: 'Sherrif Shorunke', number: '1111111111'},
  {name: 'Ridwan Adeleke', number: '1000000000'}
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
