import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { intratransferM,niptransfer } from 'src/app/_models/bankModel';
import { ApiProvider } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LotusServiceProxy,Nptransfer,Nptransferbody, SingleBody,SingleGenericPayload } from 'src/app/_services/service-proxies';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  processCompleted = false
  transfer: FundTransfer = {}
  showProcessing = false;
  transferObj: intratransferM = { body: {} }
  niptransferObj: niptransfer = { body: {} }
  
  fundtransferPayload = new Nptransfer().clone();
  bodyfundtransferPayload = new Nptransferbody().clone();

  lotusSingle = new SingleBody().clone();
  bodylotusSingle = new SingleGenericPayload().clone();
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private transferService: TransferService,
    private apiService: ApiProvider,
    private shortcutService: ShortcutsService,
    private AuthenService: AuthenticationService,
    private lotusService: LotusServiceProxy,
  ) { }
  ionViewWillEnter(){
    this.transferService.get().subscribe(data => {
      this.transfer = data
    })
  }
  ngOnInit() {
  
  }

  processingButtonClicked(){
    this.router.navigateByUrl('fundtransfer/receipt')
    // this.router.navigateByUrl('/')
  }
  submit() {
    
    this.showProcessing = true
    var amt = this.transfer.amount.replace(/,/g, "");
    this.AuthenService.getuser().then(userDetails => {
      if (this.transfer.transferType == "Other Banks") {        
        this.bodyfundtransferPayload.beneficiaryAccountNo =  this.transfer.toAccountNo;
        this.bodyfundtransferPayload.beneficiaryAccountName = this.transfer.toAccountName;
        this.bodyfundtransferPayload.externalBankCode = this.transfer.tobankCode;
        this.bodyfundtransferPayload.currency =this.transfer.currencyCode;
        this.bodyfundtransferPayload.amount  = String(Math.round(amt));
        this.bodyfundtransferPayload.nameEnquiryRef  = this.transfer.NameEnquiryRef;
        this.bodyfundtransferPayload.channelCode = "1";
        this.bodyfundtransferPayload.channel = "OzayConsulting";
        this.bodyfundtransferPayload.beneficiaryBVN = this.transfer.beneficiaryaccountbvn;
        this.bodyfundtransferPayload.narration = this.transfer.narration;
        this.bodyfundtransferPayload.originatorAccountNumber = this.transfer.accountNo;
        this.fundtransferPayload.body = this.bodyfundtransferPayload;
        this.lotusService.nipTransfer(this.fundtransferPayload, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe(data => {
          if (!data.hasError) {
            this.shortcutService.showToast(`Tranfer Posted Successfully`, 'success')
            window.setTimeout(() => { this.processCompleted = true; this.transferService.store({}) }, 5000)
       
          } else {
            this.showProcessing = false;
            this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
          }
        }, (error) => {
          this.showProcessing = false;
          this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
        })
      }
      else {
        this.bodylotusSingle.debitAccount= this.transfer.accountNo;
        this.bodylotusSingle.amount = parseInt(amt);
        this.bodylotusSingle.currency = this.transfer.currencyCode;
        this.bodylotusSingle.creditAccount = this.transfer.toAccountNo;
        this.bodylotusSingle.channel = "OzayConsulting";
        this.bodylotusSingle.narration = this.transfer.narration;
        this.lotusSingle.body = this.bodylotusSingle;
        this.lotusService.single(this.lotusSingle, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe(data => {
          if (!data.hasError) {
            this.shortcutService.showToast(`Tranfer Posted Successfully`, 'success')
            window.setTimeout(()=>{this.processCompleted = true;this.transferService.store({})}, 5000)
          } else {
            this.showProcessing = false;
            this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
          }
        }, (error) => {
          console.log(error)
          this.showProcessing = false;
        this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
      })

      }
      
     });
    // if (this.transfer.transferType == "Other Banks") {
    //   var amt = this.transfer.amount.replace(/,/g, "");
    //   this.niptransferObj.body.externalBankCode = this.transfer.tobankCode;
    //   this.niptransferObj.body.beneficiaryAccountNo = this.transfer.toAccountNo;
    //   this.niptransferObj.body.currency = "NGN";
    //   this.niptransferObj.body.amount = Math.round(amt);
    //   this.niptransferObj.body.nameEnquiryRef = this.transfer.NameEnquiryRef;
    //   this.niptransferObj.body.channelCode = "OzayConsulting";
    //   this.niptransferObj.body.beneficiaryAccountName = this.transfer.toAccountName;
    //   this.niptransferObj.body.channel = "OzayConsulting";
    //   this.niptransferObj.body.beneficiaryBVN = this.transfer.beneficiaryaccountbvn;
    //   this.niptransferObj.body.narration = this.transfer.narration;
    //   this.niptransferObj.body.originatorAccountNumber = this.transfer.accountNo;

    //   this.apiService.nipTransfer(this.niptransferObj).subscribe((data:any) => {
    //     if (!data.error) {
    //       this.shortcutService.showToast(`Tranfer Posted Successfully`, 'success')
    //       window.setTimeout(() => { this.processCompleted = true; this.transferService.store({}) }, 3000)
     
    //     } else {
    //       this.showProcessing = false;
    //       this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
    //     }
    //   }, (error) => {
    //     this.showProcessing = false;
    //     this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
    //   })
    // } else {
    //   var amt = this.transfer.amount.replace(/,/g, "");
    //   this.transferObj.body.debitAccount = this.transfer.accountNo;
    //   this.transferObj.body.amount = (amt.replace('.', ""))/100; 
    //   this.transferObj.body.currency = "NGN";
    //   this.transferObj.body.creditAccount = this.transfer.toAccountNo;
    //   this.transferObj.body.channel = "OzayConsulting";
    //   this.transferObj.body.narration = this.transfer.narration;
  
    //   this.apiService.postIntraTransfer(this.transferObj).subscribe((data:any) => {
    //     if (!data.error) {
    //       this.shortcutService.showToast(`Tranfer Posted Successfully`, 'success')
    //       window.setTimeout(()=>{this.processCompleted = true;this.transferService.store({})}, 3000)
    //     } else {
    //       this.showProcessing = false;
    //       this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
    //     }
    //   }, (error) => {
    //       console.log(error)
    //       this.showProcessing = false;
    //     this.shortcutService.showErrorToast(`Error While Posting Transfer Transaction`)
    //   })
    // }

   
  }

  goBack(){
    this.navCtrl.back()
  }
}
