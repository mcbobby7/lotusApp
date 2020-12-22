import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface BankAccount {
  number: string,
  name: string,
  balance: number,
  bankName: string,
  otherAccount: any[]
}

const banks: BankAccount[] = [
  {name: 'Sherrif Shorunke', number: '1111111111', balance: 100000,bankName:'',
  otherAccount:[
    {name: 'Sherrif Shorunke', number: '1111111111', balance: 100000,bankName:''},
    {name: 'Sherrif Shorunke', number: '1222222222', balance: 6000000,bankName:''},
    {name: 'Sherrif Shorunke', number: '0333333333', balance: 200000,bankName:''}]
},
  {name: 'Ridwan Adeleke', number: '1000000000', balance: 2000000,bankName:'',
  otherAccount:[
    {name: 'Ridwan Adeleke', number: '1000000000', balance: 2000000,bankName:''},
    {name: 'Ridwan Adeleke', number: '1000000001', balance: 600000,bankName:''},
    {name: 'Ridwan Adeleke', number: '1000000002', balance: 4000000,bankName:''},
  ]},
  {name: 'Sherrif Shorunke', number: '1222222222', balance: 6000000,bankName:'',otherAccount:[
    {name: 'Sherrif Shorunke', number: '1111111111', balance: 100000,bankName:''},
    {name: 'Sherrif Shorunke', number: '0333333333', balance: 200000,bankName:''},
    {name: 'Sherrif Shorunke', number: '1222222222', balance: 6000000,bankName:''}
  ]},
  {name: 'Sherrif Shorunke', number: '0333333333', balance: 200000,bankName:'',otherAccount:[
    {name: 'Sherrif Shorunke', number: '1111111111', balance: 100000,bankName:''},
    {name: 'Sherrif Shorunke', number: '0333333333', balance: 200000,bankName:''},
    {name: 'Sherrif Shorunke', number: '1222222222', balance: 6000000,bankName:''}
  ]},
  {name: 'Ridwan Adeleke', number: '1000000001', balance: 600000,bankName:'',otherAccount:[
    {name: 'Ridwan Adeleke', number: '1000000000', balance: 2000000,bankName:''},
    {name: 'Ridwan Adeleke', number: '1000000001', balance: 600000,bankName:''},
    {name: 'Ridwan Adeleke', number: '1000000002', balance: 4000000,bankName:''},
  ]},
  {name: 'Ridwan Adeleke', number: '1000000002', balance: 4000000,bankName:'',otherAccount:[
    {name: 'Ridwan Adeleke', number: '1000000000', balance: 2000000,bankName:''},
    {name: 'Ridwan Adeleke', number: '1000000001', balance: 600000,bankName:''},
    {name: 'Ridwan Adeleke', number: '1000000002', balance: 4000000,bankName:''},
  ]}
]
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor() { }
getallaccount(){
  return banks
}
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
