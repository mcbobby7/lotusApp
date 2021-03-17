import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { ApiProvider } from 'src/app/_services/api.service';

@Component({
  selector: 'app-cashdeposit',
  templateUrl: './cashdeposit.page.html',
  styleUrls: ['./cashdeposit.page.scss'],
})
export class CashdepositPage implements OnInit {
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: Deposit = {singleDeposit: true,proceedChk: false};
  depositMultpleObj: multiDeposit ={accountInfo:[], multiDeposit: true};

  constructor(    
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService,
    private apiService: ApiProvider) { }
  goBack(){
this.navCtrl.back()
  }
  avalidate(event,fieldelement){
  var inputentry =  event.target.value;
 var valRes =  this.inpVali.validate(event,fieldelement);
 if(valRes && fieldelement == "amount" ){
  var amt = inputentry.replace(/,/g, "");
  var newamt = amt.replace('.', "");
  this.depositObj.amount = this.inpVali.getCurrency(newamt);
    }
    if (valRes && fieldelement == "accountNumber") { 
 
    }
  }
  validateForm() {
    if (this.depositObj.accountNumber) {
      return true
    }
    return false
  }

  addDeposit(){
    this.router.navigate(['/multideposit'])
  }

  
 
 
  submitRequest(depositDetails) {
    if (this.validateForm()) {
      this.loadingBankAccount = true
      this.apiService.getAllAccountDetails(this.depositObj.accountNumber).subscribe((data:any) => {
        if (!data.error) {
          this.loadingBankAccount = false
          let acctDet = data.body[0];
          this.depositObj.bankName = "Lotus Bank";
          this.depositObj.accountName = acctDet.accountName;
          this.depositService.store(this.depositObj).then(data => {
            this.router.navigate(['/singledeposit'], { queryParams: { depositDetails: JSON.stringify(depositDetails) } })
          })
        } else {
          this.shortcutService.showErrorToast('Invalid account number')
        }
  
        
},() => {
  this.loadingBankAccount = false
  this.shortcutService.showErrorToast('Invalid account number')
})
      // const subject = this.bankService.getBankByAccountNumber(this.depositObj.accountNumber)
      // subject.subscribe((bank: BankAccount) => {
      //   this.loadingBankAccount = false
      //   console.log(bank)
      //   this.depositObj.bankName = bank.bankName;
      //   this.depositObj.accountName = bank.name;
      //   this.depositService.store(this.depositObj).then(data => {
      //     this.router.navigate(['/singledeposit'], { queryParams: { depositDetails: JSON.stringify(depositDetails) } })
      //   })
      // }, () => {
      //   this.loadingBankAccount = false
      //   this.shortcutService.showErrorToast('Invalid account number')
      // })
    } else {
      this.shortcutService.showErrorToast('Please fill all required fields')
    }
  }

  ngOnInit() {
  }

}
