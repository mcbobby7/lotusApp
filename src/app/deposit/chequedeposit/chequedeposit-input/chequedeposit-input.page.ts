import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails, multiChqDeposit } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-chequedeposit-input',
  templateUrl: './chequedeposit-input.page.html',
  styleUrls: ['./chequedeposit-input.page.scss'],
})
export class ChequedepositInputPage implements OnInit {
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: multiChqDeposit ={accountInfo:[{issuingBank:'',chqNumber:'',amount:'',erroramount: false}],};
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
  removeItem(i){
    this.depositObj.accountInfo.splice(i,1)
  }

  avalidate(...arg){
    var inputentry =  arg[0].target.value;
   
 var valRes =  this.inpVali.validate(arg[0],arg[1]);
 console.log(arg[2])
 if(valRes && arg[1] == "amount" ){
  var amt = inputentry.replace(/,/g, "");
  var newamt = amt.replace('.', "");
  this.depositObj.accountInfo[arg[2]].amount = this.inpVali.getCurrency(newamt);
 }

if(this.inpVali.invalidAmount) {
  this.depositObj.accountInfo[arg[2]].erroramount = true
}else{
  if(this.depositObj.accountInfo[arg[2]].amount == "0.00" || this.depositObj.accountInfo[arg[2]].amount == "0")
  {this.depositObj.accountInfo[arg[2]].erroramount = true}else{
    this.depositObj.accountInfo[arg[2]].erroramount = false
  }
};

  }

  addDeposit(){
    console.log(this.depositObj.accountInfo)
  const errorChk =  this.depositObj.accountInfo.map(dep=>{
  if(dep.erroramount  || !dep.amount || dep.amount == "0.00" || dep.amount == "0" || !dep.issuingBank || !dep.chqNumber){
    return false
  }else{
    return true
  }
    
  })
 // console.log(errorChk,errorChk.indexOf(false))
  if(errorChk.indexOf(false) > -1){
    this.shortcutService.showErrorToast('All Fields are required')
  }else{
    this.depositObj.accountInfo.push({issuingBank:'',chqNumber:'',amount:'',erroramount: false});
    console.log(this.depositObj.accountInfo)
  }
  
  }
  validateForm() {   
    if(this.depositObj.selfdeposit) 
  { 
     const errorChk =  this.depositObj.accountInfo.map(dep=>{
      if(dep.erroramount  || !dep.amount || dep.amount == "0.00" || dep.amount == "0" || !dep.issuingBank || !dep.chqNumber){
        return false
      }else{
        return true
      }
        
      });
      console.log(errorChk)
      if(errorChk.indexOf(false) > -1){
        this.shortcutService.showErrorToast('Cheque Deposit Item '+(errorChk.indexOf(false) + 1)+' contain error')
        return false
     
      }else{
        this.submitRequest()
        return true
      }
  }else{
    this.shortcutService.showErrorToast('Please specify sending to')
  }}

  submitRequest() {
    this.loadingBankAccount = true;   
      this.depositService.store(this.depositObj).then(data => {
        this.loadingBankAccount = false;  
        this.router.navigate(['chequedepositordetails'])
      })
  }
  ionViewWillEnter(){
    this.depositService.get().subscribe((data: any) => {
      this.depositObj = {...data}
    })
  }
  ngOnInit() {
  
  }
}
