import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { IGetAccountDetailsResponse, LotusServiceProxy } from 'src/app/_services/service-proxies';
import { BankAccount, BankService } from '../../_services/bank.service';
import { ShortcutsService } from '../../_services/shortcuts.service';
import { Withdrawal, WithdrawalService } from '../../_services/withdrawal.service';

@Component({
  selector: 'app-cheque-withdrawal',
  templateUrl: './cheque-withdrawal.page.html',
  styleUrls: ['./cheque-withdrawal.page.scss'],
})
export class ChequeWithdrawalPage implements OnInit {
  formGroup = new FormGroup({
    accountNo: new FormControl('')
  })

  withdrawal: Withdrawal = {}
  loadingAccountName = false;
  customerAccountResp: IGetAccountDetailsResponse;
  currentUser: any = "";
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
    private withdrawalService: WithdrawalService,
    private inpVali: InputvalidationService,

    private activatedroute: ActivatedRoute,
    private AuthenService: AuthenticationService,
    private lotusService: LotusServiceProxy,
    private GalertService: GlobalalertservicesService,

  ) { }
  accountNo = ""
  ionViewWillEnter() {
    
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.currentUser = userdata[0];
          console.log(this.currentUser)
          this.GalertService.gdismissLoading();
        }
      }
    })
  }
  ngOnInit() {}
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }

  submit() {
    if (this.accountNo) {
      this.GalertService.gPresentLoading('Please wait...');
      this.loadingAccountName = true;
      this.AuthenService.getuser().then(userDetails => {
        this.lotusService.getAccountDetails(this.accountNo, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
          if (!data.hasError) {
            this.GalertService.gPresentToast(data.message, "success");
            this.loadingAccountName = false;
            this.customerAccountResp = data.result;
            let acctDet = this.customerAccountResp.body.find(x=>x.longAccount == this.accountNo);
            const withdrawalForm: Withdrawal = {};
            withdrawalForm.accountName = acctDet.accountName
            withdrawalForm.accountNo = this.accountNo;
            withdrawalForm.balance = Number(acctDet.bookBalance);
            withdrawalForm.currencyCode = acctDet.currencyCode;
            withdrawalForm.withdrawaltype = "Cheque";
            this.withdrawalService.store(withdrawalForm).then(data => {
              this.router.navigate(['/withdrawal/amount'],{queryParams:{withdrawaltype:"Cheque"}});
            })
           }
          else {
            this.loadingAccountName = false;
            this.GalertService.gPresentToast(data.message, "danger");
          }
          this.GalertService.gdismissLoading();
        });
       });
   
    } else {
      this.GalertService.gPresentToast("Please select Account", "danger");
    }
    // this.loadingAccountName = true
    // this.bankService.getBankByAccountNumber(this.accountNo).subscribe((bank: BankAccount) => {
    //   this.loadingAccountName = false
    //   const withdrawalForm: Withdrawal = {}
    //   withdrawalForm.accountName = bank.name
    //   withdrawalForm.accountNo = this.accountNo
    //   withdrawalForm.balance = bank.balance
    //   this.withdrawalService.store(withdrawalForm).then(data => {
    //     this.accountNo = '';
    //     this.router.navigate(['withdrawal/cheque-withdrawal-confirm'], {queryParams: {nxtRoute: '/withdrawal/amount'}})
    //   })
    // }, err => {
    //   this.loadingAccountName = false
    //   this.shortcuts.showErrorToast('Error - Invalid Account Number')
    // })
  }

  goBack(){
    this.router.navigate(['/dashbord']);
  }

}
