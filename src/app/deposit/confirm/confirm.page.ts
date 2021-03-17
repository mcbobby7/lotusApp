import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService, multiDeposit } from 'src/app/_services/deposit.service';
import { ApiProvider } from 'src/app/_services/api.service';
import { intratransferM, nipenquiry, niptransfer, cashdepositM, inwardchqPost,denomination } from '../../_models/bankModel';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  depositObj: Deposit = {}
  cashdeposit: cashdepositM = {body:{}};
  multideposit: multiDeposit = {}
  cashdenomination: denomination = {
    denomination: 'NGN5',
    unit: 2
  };
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private depositService: DepositService,
    private apiService: ApiProvider,
    private shortcutService: ShortcutsService
  ) { }
  ionViewWillEnter() {
    
    this.depositService.get().subscribe((data:any) => {
      if (data.multiDeposit) {
        this.multideposit = data;
        this.depositObj = data
  
      } else {
        this.depositObj = data 
      }
      
      
    })
  }
  ngOnInit() {
   
  }
  postDeposit(depositObj) {
  
}
  submit() {
    
    this.showProcessing = true;
    var i = 0;
    if (this.multideposit.multiDeposit) {
      this.multideposit.accountInfo.forEach(depValue => {    
        let cshdem = [];
        var amt = depValue.amount.replace(/,/g, "");
        this.cashdeposit.body.depositAmount = Number(amt);
        this.cashdenomination.unit = this.cashdeposit.body.depositAmount / 5;
        cshdem.push(this.cashdenomination);
        this.cashdeposit.body.denominationValues = cshdem;        
        this.cashdeposit.body.creditAccount = Number(depValue.accountNumber);
        this.cashdeposit.body.narrative = this.multideposit.narration;
        this.cashdeposit.body.documentNo = Math.ceil(Math.random() * 10e10) ;
        this.cashdeposit.body.channel = "OzayConsulting";
        this.apiService.tellerCashDeposit(this.cashdeposit).subscribe((data:any) => {       
          if (!data.error) {
            this.shortcutService.showToast(`Deposit Number ${i} Posted Successfully`, 'success')
            window.setTimeout(()=>{this.processCompleted = true;this.depositService.store({})}, 5000)
          } else {
            this.showProcessing = false;
            this.shortcutService.showErrorToast(`Error While Posting Deposit Number ${i} Transaction`)
          }
         
        }, (error) => {
          this.showProcessing = false;
          this.shortcutService.showErrorToast(`Error While Posting Deposit Number ${i} Transaction`)
            console.log(error);
    })
      i++
      })
    } else {
      let cshdem = [];
      var amt = this.depositObj.amount.replace(/,/g, "");
      this.cashdeposit.body.depositAmount = Number(amt);
      this.cashdenomination.unit = this.cashdeposit.body.depositAmount / 5;
      cshdem.push(this.cashdenomination);
      this.cashdeposit.body.denominationValues = cshdem;
      
      this.cashdeposit.body.creditAccount = Number(this.depositObj.accountNumber);
      this.cashdeposit.body.narrative = this.depositObj.narration;
      this.cashdeposit.body.documentNo = Math.ceil(Math.random() * 10e10) ;
      this.cashdeposit.body.channel = "OzayConsulting";
      this.apiService.tellerCashDeposit(this.cashdeposit).subscribe((data:any) => {
       
        if (!data.error) {
          this.shortcutService.showToast('Deposit Posted Successfully', 'success')
          window.setTimeout(()=>{this.processCompleted = true;this.depositService.store({})}, 5000)
        } else {
          this.showProcessing = false;
          this.shortcutService.showErrorToast('Error While Posting Deposit')
        }
       
      }, (error) => {
          console.log(error);
  })
    }
 
   
  }

  processingButtonClicked(){
    this.showProcessing = false
    this.router.navigateByUrl('/deposit/receipt')
    // this.router.navigateByUrl('/')
  }

  goBack(){
    this.navCtrl.back()
  }

  processingClicked(){
    
  }

}
