import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

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
  depositObj: Deposit = {};
  depositMultpleObj: multiDeposit ={accountInfo:[]};

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
  avalidate(event,fieldelement){
    var inputentry =  event.target.value;
 var valRes =  this.inpVali.validate(event,fieldelement);
 if(valRes && fieldelement == "amount" ){
  var amt = inputentry.replace(/,/g, "");
  var newamt = amt.replace('.', "");
  this.depositObj.amount = this.inpVali.getCurrency(newamt);
 }
  }
  validateForm() {
    if (this.depositObj.accountNumber) {
      return true
    }
    return false
  }

  addDeposit(){
    this.depositMultpleObj.accountInfo.push({accountNumber:'',amount:''});
    console.log(this.depositMultpleObj.accountInfo)
  }
  submitRequest(depositDetails) {
    if (this.validateForm()) {
      this.loadingBankAccount = true
      const subject = this.bankService.getBankByAccountNumber(this.depositObj.accountNumber)
      subject.subscribe((bank: BankAccount) => {
        this.loadingBankAccount = false
        console.log(bank)
        this.depositObj.bankName = bank.name
        this.depositService.store(this.depositObj).then(data => {
          this.router.navigate(['/deposit/depositor-detail'], { queryParams: { depositDetails: JSON.stringify(depositDetails) } })
        })
      }, () => {
        this.loadingBankAccount = false
        this.shortcutService.showErrorToast('Invalid account number')
      })
    } else {
      this.shortcutService.showErrorToast('Please fill all required fields')
    }
  }

  ngOnInit() {
  }

}
