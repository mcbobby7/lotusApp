import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-multideposit',
  templateUrl: './multideposit.page.html',
  styleUrls: ['./multideposit.page.scss'],
})
export class MultidepositPage implements OnInit {
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: Deposit = {singleDeposit: true,proceedChk: false};
  depositMultpleObj: multiDeposit ={accountInfo:[{accountNumber:'',amount:''}], multiDeposit: true};
  tranxError: boolean = false;
  constructor(    
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService) { }
  goBack(){
this.navCtrl.back()
  }
  avalidate(...arg){
    var inputentry =  arg[0].target.value;
   
 var valRes =  this.inpVali.validate(arg[0],arg[1]);
 console.log(arg[2])
 if(valRes && arg[1] == "amount" ){
  var amt = inputentry.replace(/,/g, "");
  var newamt = amt.replace('.', "");
  this.depositMultpleObj.accountInfo[arg[2]].amount = this.inpVali.getCurrency(newamt);
 }
if(this.inpVali.invalidAccount) {
  this.depositMultpleObj.accountInfo[arg[2]].erroraccountNumber = true
}else{
  this.depositMultpleObj.accountInfo[arg[2]].erroraccountNumber = false 
  const subject = this.bankService.getBankByAccountNumber(this.depositMultpleObj.accountInfo[arg[2]].accountNumber);
  subject.subscribe((bank: BankAccount) => {
    this.depositMultpleObj.accountInfo[arg[2]].accountName = bank.name;
    this.depositMultpleObj.accountInfo[arg[2]].bankName = bank.bankName;         
    this.depositMultpleObj.accountInfo[arg[2]].erroraccountNumber = false 
  }, () => {
    this.depositMultpleObj.accountInfo[arg[2]].erroraccountNumber = true
  })
  
};
if(this.inpVali.invalidAmount) {
  this.depositMultpleObj.accountInfo[arg[2]].erroramount = true
}else{
  if(this.depositMultpleObj.accountInfo[arg[2]].amount == "0.00" || this.depositMultpleObj.accountInfo[arg[2]].amount == "0")
  {this.depositMultpleObj.accountInfo[arg[2]].erroramount = true}else{
    this.depositMultpleObj.accountInfo[arg[2]].erroramount = false
  }
};

  }

  validateForm() {    
    const errorChk =  this.depositMultpleObj.accountInfo.map(dep=>{
      if(dep.erroramount || dep.erroraccountNumber || !dep.accountNumber || !dep.amount || dep.amount == "0.00" || dep.amount == "0"){
        return false
      }else{
        return true
      }
        
      });
      console.log(errorChk)
      if(errorChk.indexOf(false) > -1){
        this.shortcutService.showErrorToast('Deposit Item '+(errorChk.indexOf(false) + 1)+' contain error')
        return false
     
      }else{
        this.submitRequest()
        return true
      }
  }

  addDeposit(){
    console.log(this.depositMultpleObj.accountInfo)
  const errorChk =  this.depositMultpleObj.accountInfo.map(dep=>{
  if(dep.erroramount || dep.erroraccountNumber || !dep.accountNumber || !dep.amount || dep.amount == "0.00" || dep.amount == "0"){
    return false
  }else{
    return true
  }
    
  })
 // console.log(errorChk,errorChk.indexOf(false))
  if(errorChk.indexOf(false) > -1){
    this.shortcutService.showErrorToast('Account Number and Amount is required for all Deposit transactions')
  }else{
    this.depositMultpleObj.accountInfo.push({accountNumber:'',amount:''});
    console.log(this.depositMultpleObj.accountInfo)
  }
  
  }
  
  submitRequest() {
    this.loadingBankAccount = true
   
      this.depositService.store(this.depositMultpleObj).then(data => {
        this.router.navigate(['/deposit/depositor-detail'])
      })
  }
  removeItem(i){
    this.depositMultpleObj.accountInfo.splice(i,1)
  }
  ngOnInit() {
  }


}
