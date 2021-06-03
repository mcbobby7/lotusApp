import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CashWithdrawalModel, CashWithdrawalModelBody,PostChequePayload, PostChequePayloadBody,DenominationValue, LotusServiceProxy,SingleBody,SingleGenericPayload } from 'src/app/_services/service-proxies';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  withdrawal: Withdrawal = {}
  cashtoggleWithdrawal: boolean = true;
  processCompleted = false
  showProcessing = false
  cashWithdrawal = new CashWithdrawalModel().clone();
  bodyCashWithdrawal = new CashWithdrawalModelBody().clone();
  chequeWithdrawal = new PostChequePayload().clone();
  bodychequeWithdrawal =new PostChequePayloadBody().clone();
  cashdenomination: DenominationValue[]=[];
  denomination = new DenominationValue().clone();
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private withdrawalService: WithdrawalService,
    private LotusService: LotusServiceProxy,
    private AuthenService: AuthenticationService,
    private shortcutService: ShortcutsService,
  ) { }
  ionViewWillEnter(){
    this.withdrawalService.get().subscribe(data => {
      this.withdrawal = data
    })
  }
  ngOnInit() {

  }

  processingButtonClicked(){
    this.router.navigateByUrl('withdrawal/receipt')
    // this.router.navigateByUrl('/')
  }
  goEdit() {
    if (this.withdrawal.withdrawaltype == "Cheque") {
      this.router.navigate(['/withdrawal/cheque-withdrawal']);
    } else {
      this.router.navigate(['/withdrawal']);
    }
    
  }
  submit() {
    this.showProcessing = true;
    this.AuthenService.getuser().then(userData => {
      if (this.withdrawal.withdrawaltype == "Cheque") {
        this.bodychequeWithdrawal.amount = String(this.withdrawal.amount);
        this.bodychequeWithdrawal.chequeNo = this.withdrawal.chequeNo;
        this.bodychequeWithdrawal.debitAccount = this.withdrawal.accountNo;
        this.bodychequeWithdrawal.currency = this.withdrawal.currencyCode;
        this.chequeWithdrawal.body = this.bodychequeWithdrawal;
      this.LotusService.postChequeInward(this.chequeWithdrawal, userData[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
        if (!data.hasError) {          
          window.setTimeout(() => {
            window.setTimeout(() => { this.processCompleted = true; this.withdrawalService.store({}) }, 5000)
          }, 5000)
        } else {
          this.showProcessing = false;
          this.shortcutService.showErrorToast('Error While Processing Wothdrawal')
        }
       
      }, (error) => {
        console.log(error);
      })
    }else
    {
      this.denomination.denomination = 'NGN5';
    this.denomination.unit = String(Number(this.withdrawal.amount) / 5);
    this.cashdenomination.push(this.denomination);
    this.bodyCashWithdrawal.denominationValues = this.cashdenomination; 
    this.bodyCashWithdrawal.debitAccount = this.withdrawal.accountNo;
    this.bodyCashWithdrawal.localAmount = String(this.withdrawal.amount);
    // this.bodyCashWithdrawal.currency = this.withdrawal.currencyCode ;
    this.bodyCashWithdrawal.debitAccount = this.withdrawal.accountNo;
    this.bodyCashWithdrawal.narrative = 'Self';
    this.bodyCashWithdrawal.documentNo = String(Math.ceil(Math.random() * 10e10)) ;
    this.bodyCashWithdrawal.channel = "OzayConsulting";
    this.cashWithdrawal.body = this.bodyCashWithdrawal;
   
      this.LotusService.tellerCashWithdrawal(this.cashWithdrawal, userData[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
        if (!data.hasError) {          
          window.setTimeout(() => {
            window.setTimeout(() => { this.processCompleted = true; this.withdrawalService.store({}) }, 5000)
          }, 5000)
        } else {
          this.showProcessing = false;
          this.shortcutService.showErrorToast('Error While Processing Wothdrawal')
        }
       
      }, (error) => {
        console.log(error);
      })
   
  
    }
  });
  }

  goBack(){
    this.navCtrl.back()
  }
}
