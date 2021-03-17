import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { ApiProvider } from '../_services/api.service';
import { BankAccount, BankService } from '../_services/bank.service';
import { ShortcutsService } from '../_services/shortcuts.service';
import { TransferService } from '../_services/transfer.service';
import { OtpfingerprintoptionComponent } from '../components/otpfingerprintoption/otpfingerprintoption.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.page.html',
  styleUrls: ['./fundtransfer.page.scss'],
})
export class FundtransferPage implements OnInit {
  formGroup = new FormGroup({
    accountNo: new FormControl('')
  })
  loadingBankAccount = false
  accountNo = ""
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private transferService: TransferService,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
    private apiService: ApiProvider,
    public popoverController: PopoverController,
  ) { }

  async popAuthtype(){
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
    if(val == "fingerprint")this.router.navigate(['capturebiometric'],{queryParams: {nxtRoute: '/transfertype'}});
    if(val == "otp")this.router.navigate(['otpvalidation'],{queryParams: {nxtRoute: '/transfertype'}});
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }

  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }
  
   
  submit() {

      this.loadingBankAccount = true
      this.apiService.getAllAccountDetails(this.accountNo).subscribe((data:any) => {
        if (!data.error) {
          this.loadingBankAccount = false
          let acctDet = data.body[0];
       
          this.transferService.store({
            accountNo: this.accountNo,
            accountName: acctDet.accountName,
            balance: acctDet.balance
          }).then(data => {
            this.loadingBankAccount = false
            this.popAuthtype();
          //  this.router.navigate(['capturebiometric'], {queryParams: {nxtRoute: '/transfertype'}})
          })
        } else {
          this.loadingBankAccount = false
          this.shortcuts.showErrorToast('Invalid account number')
        }
  
        
},() => {
  this.loadingBankAccount = false
  this.shortcuts.showErrorToast('Invalid account number')
})

  
  }
  // submit(){
  //   this.loadingBankAccount = true
  //   this.bankService.getBankByAccountNumber(this.accountNo).subscribe((bank: BankAccount) => {
  //     this.loadingBankAccount = false
  //     this.transferService.store({
  //       accountNo: this.accountNo,
  //       accountName: bank.name,
  //       balance: bank.balance
  //     }).then(data => {
  //       this.loadingBankAccount = false
  //       this.router.navigate(['capturebiometric'], {queryParams: {nxtRoute: '/transfertype'}})
  //     })
  //   }, () => {
  //     this.loadingBankAccount = false
  //     this.shortcuts.showErrorToast('Error - Invalid Account Number')
  //   })
  // }

  goBack(){
    this.navCtrl.back()
  }
  ngOnInit() {
  }

}
