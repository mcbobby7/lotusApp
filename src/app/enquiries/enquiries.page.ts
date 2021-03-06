import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { ApiProvider } from 'src/app/_services/api.service';
import { OtpfingerprintoptionComponent } from '../components/otpfingerprintoption/otpfingerprintoption.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.page.html',
  styleUrls: ['./enquiries.page.scss'],
})
export class EnquiriesPage implements OnInit {

  constructor(private navCtrl: NavController,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService,
    private apiService: ApiProvider,
    public popoverController: PopoverController,) { }

  toPage = '';
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: Deposit = {};
  depositMultpleObj: multiDeposit ={accountInfo:[]};

  async popAuthtype(depositDetails){
    const subject = new Subject<string>()
    const modal = await this.popoverController.create({
      component: OtpfingerprintoptionComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(async val => {
      modal.dismiss()
      if(val){
    if(val == "fingerprint")this.router.navigate(['/enquiries/account-verify'],{ queryParams: { depositDetails: JSON.stringify(depositDetails), toPage: this.toPage } });
    if(val == "otp")this.router.navigate(['otpvalidation'],{ queryParams: { depositDetails: JSON.stringify(depositDetails), toPage: this.toPage } });
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }

  ionViewWillEnter(){
    this.activatedRouter.queryParams.subscribe(data => {
      this.toPage = data.toPage
    })
  }

  ngOnInit() {
  }

  goBack() {
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
      this.apiService.getAllAccountDetails(this.depositObj.accountNumber).subscribe((data:any) => {
        if (!data.error) {
          this.loadingBankAccount = false
          let acctDet = data.body[0];
          this.depositObj.bankName = "Lotus Bank";
          this.depositObj.accountName = acctDet.accountName;
          this.depositObj.balance = acctDet.accountBalance;
          this.depositObj.bookbalance = acctDet.bookBalance;
          this.depositObj.currencyCode = acctDet.currencyCode;
          this.depositObj.accountbvn = acctDet.bvn;
          this.depositService.store(this.depositObj).then(data => {

         this.popAuthtype(depositDetails)
        // this.router.navigate(['/enquiries/account-verify'], { queryParams: { depositDetails: JSON.stringify(depositDetails), toPage: this.toPage } })
          })
        } else {
          this.shortcutService.showErrorToast('Invalid account number')
        }
  
        
},() => {
  this.loadingBankAccount = false
  this.shortcutService.showErrorToast('Invalid account number')
})
    } else {
      this.shortcutService.showErrorToast('Please fill all required fields')
    }
  }
    // submitRequest(depositDetails) {
    //   if (this.validateForm()) {
    //     this.loadingBankAccount = true
    //     const subject = this.bankService.getBankByAccountNumber(this.depositObj.accountNumber)
    //     subject.subscribe((bank: BankAccount) => {
    //       this.loadingBankAccount = false
    //       console.log(bank)
    //       this.depositObj.bankName = bank.name
    //       this.depositService.store(this.depositObj).then(data => {
    //         this.router.navigate(['/enquiries/account-verify'], { queryParams: { depositDetails: JSON.stringify(depositDetails), toPage: this.toPage } })
    //       })
    //     }, () => {
    //       this.loadingBankAccount = false
    //       this.shortcutService.showErrorToast('Invalid account number')
    //     })
    //   } else {
    //     this.shortcutService.showErrorToast('Please fill all required fields')
    //   }
    // }

}
