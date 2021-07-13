import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { BankAccount, BankService } from '../_services/bank.service';
import { ShortcutsService } from '../_services/shortcuts.service';
import { Withdrawal, WithdrawalService } from '../_services/withdrawal.service';
import { IUser, LotusServiceProxy,IGetAccountDetailsResponse } from '../_services/service-proxies';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';
import { InputvalidationService } from '../_services/inputvalidation.service';
import { NgIdleService } from '../_services/ng-idle.service';
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {
  withdrawal: Withdrawal = {}
  loadingAccountName = false;
  currentUser: any = "";
  customerAccountResp: IGetAccountDetailsResponse;
  constructor(
    private ngIdle: NgIdleService,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
    private withdrawalService: WithdrawalService,
    private activatedroute: ActivatedRoute,
    private AuthenService: AuthenticationService,
    private lotusService: LotusServiceProxy,
    private GalertService: GlobalalertservicesService,
    public inpVali: InputvalidationService,
    private alertController: AlertController,
  ) { }
  accountNo = "";
  ngOnInit() {}
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }
  // initTimer(firstTimerValue: number, secondTimerValue: number): void {
  //   // Timer value initialization
  //   this.ngIdle.USER_IDLE_TIMER_VALUE_IN_MIN = firstTimerValue;
  //   this.ngIdle.FINAL_LEVEL_TIMER_VALUE_IN_MIN = secondTimerValue;
  //   // end
 
  //   // Watcher on timer
  //   this.ngIdle.initilizeSessionTimeout();
  //   this.ngIdle.userIdlenessChecker.subscribe(async (status: string) => {
  //     if (status == "STOPPED_TIMER") {
  //       this.AuthenService.clearusers();
  //       const alert = await this.alertController.create({
  //         cssClass: 'my-custom-class',
  //         backdropDismiss: false,
  //         header: 'Alert',
  //         message: 'Invalid session timed-out',
  //         buttons:  [
  //           {
  //             text: 'Ok',
  //             role: 'cancel',
  //             cssClass: 'secondary',
  //             handler: (blah) => {
  //               console.log('Confirm Cancel: blah');
  //             }
  //           }
  //         ]
  //       });
  //       await alert.present();
      
       
  //     }
  //    // this.initiateFirstTimer(status);
  //   });
 
  //   // this.ngIdle.secondLevelUserIdleChecker.subscribe((status: string) => {
  //   //   this.initiateSecondTimer(status);
  //   // });
  // }
  // initiateFirstTimer = (status: string) => {
  //   switch (status) {
  //     case 'INITIATE_TIMER':
  //       break;

  //     case 'RESET_TIMER':
  //       break;

  //     case 'STOPPED_TIMER':
  //       this.GalertService.gPresentToast("You are Inactive, your session will be terminated shortly", "success");
  //       console.log('first timer stopped')
  //     //  this.showSendTimerDialog();
  //       break;

  //     default:
  //       this.GalertService.gPresentToast(`Time Left ${Number(status)}`, "danger");
  //       console.log(`Time Left ${Number(status)}`)
  //      // this.idleTimerLeft = this.formatTimeLeft(Number(status));
  //       break;
  //   }
  // }

  // initiateSecondTimer = (status: string) => {
  //   switch (status) {
  //     case 'INITIATE_SECOND_TIMER':
  //       break;

  //     case 'SECOND_TIMER_STARTED':
  //       break;

  //     case 'SECOND_TIMER_STOPPED':
  //       this.GalertService.gPresentToast(`logout`, "danger");
  //       console.log('logout')
  //      // this.logout();
  //       break;

  //     default:
  //       this.GalertService.gPresentToast(`Time Left is ${Number(status)}`, "danger");
  //       console.log(`Time Left is ${status}`)
  //      // this.secondTimerLeft = status;
  //       break;
  //   }
  // }

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
    this.router.navigate(['/dashbord'])
  }
  ionViewWillEnter() {
    
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.currentUser = userdata[0];
          console.log(this.currentUser)
          this.GalertService.gdismissLoading();
        //  this.initTimer(0.2, 0);
        }
      }
    })
  }
}