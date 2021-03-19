import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { BankAccount, BankService } from '../_services/bank.service';
import { ShortcutsService } from '../_services/shortcuts.service';
import { Withdrawal, WithdrawalService } from '../_services/withdrawal.service';
import { IUser, LotusServiceProxy,IGetAccountDetailsResponse } from '../_services/service-proxies';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {
  formGroup = new FormGroup({
    accountNo: new FormControl('')
  })

  withdrawal: Withdrawal = {}
  loadingAccountName = false;
  currentUser: any = "";
  customerAccountResp: IGetAccountDetailsResponse;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
    private withdrawalService: WithdrawalService,
    private activatedroute: ActivatedRoute,
    private AuthenService: AuthenticationService,
    private lotusService: LotusServiceProxy,
    private GalertService: GlobalalertservicesService,
  ) { }
  accountNo = "";
  ngOnInit() {}
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }

  submit() {
    if (this.accountNo) {
      this.GalertService.gPresentLoading('Please wait...');
      this.loadingAccountName = true;
      this.AuthenService.getuser().then(userDetails => {
        this.lotusService.getAccountDetails(this.accountNo, userDetails[0].sessionToken).subscribe((data) => {
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
            this.withdrawalService.store(withdrawalForm).then(data => {
              this.router.navigate(['/withdrawal/amount']);
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
    
  }

  goBack(){
    this.navCtrl.back()
  }
  ionViewWillEnter() {
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.currentUser = userdata[0];
          console.log(this.currentUser)
        }
      }
    })
  }
}