import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LotusServiceProxy,SingleBody,SingleGenericPayload } from 'src/app/_services/service-proxies';
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
  cashWithdrawal = new SingleBody().clone();
  bodyCashWithdrawal = new SingleGenericPayload().clone();
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
    this.router.navigate(['/withdrawal']);
  }
  submit() {
    this.showProcessing = true;
    this.bodyCashWithdrawal.debitAccount = this.withdrawal.accountNo;
    this.bodyCashWithdrawal.amount = this.withdrawal.amount;
    this.bodyCashWithdrawal.currency = this.withdrawal.currencyCode ;
    this.bodyCashWithdrawal.debitAccount = this.withdrawal.accountNo;
    this.bodyCashWithdrawal.channel = "OzayConsulting";
    this.cashWithdrawal.body = this.bodyCashWithdrawal;
    this.AuthenService.getuser().then(userData => {
      this.LotusService.singlePost(this.cashWithdrawal, userData[0].sessionToken).subscribe((data) => {
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
   
    });
  }

  goBack(){
    this.navCtrl.back()
  }
}
