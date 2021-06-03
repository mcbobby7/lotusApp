import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService, multiDeposit } from 'src/app/_services/deposit.service';
import { ApiProvider } from 'src/app/_services/api.service';
import { intratransferM, nipenquiry, niptransfer, cashdepositM, inwardchqPost,denomination } from '../../_models/bankModel';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { LotusServiceProxy,CtRoot,CtBody,DenominationValue, } from 'src/app/_services/service-proxies';
import { AuthenticationService } from 'src/app/_services/authentication.service';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  depositObj: Deposit = {};

  cashdeposit = new CtRoot().clone();
  bodyCashDeposit = new CtBody().clone();
  multideposit: multiDeposit = {}
  cashdenomination: DenominationValue[]=[];
  denomination = new DenominationValue().clone();
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private depositService: DepositService,
    private apiService: ApiProvider,
    private shortcutService: ShortcutsService,
    private LotusService: LotusServiceProxy,
    private AuthenService: AuthenticationService,
  ) { }
  ionViewWillEnter() {
    
    this.depositService.get().subscribe((data: any) => {
      console.log(data)
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

  submit() {
    
    this.showProcessing = true;
    this.AuthenService.getuser().then(userData => {
      var i = 0;
      if (this.multideposit.multiDeposit) {
        this.multideposit.accountInfo.forEach(depValue => {
          let cshdem = [];
          var amt = depValue.amount.replace(/,/g, "");
          this.bodyCashDeposit.depositAmount = amt;
          this.denomination.denomination = 'NGN5';
          this.denomination.unit = String(Number(amt) / 5);
          this.cashdenomination.push( this.denomination);
          this.bodyCashDeposit.denominationValues = this.cashdenomination;
          this.bodyCashDeposit.creditAccount = depValue.accountNumber;
          this.bodyCashDeposit.narrative = this.multideposit.narration;
          this.bodyCashDeposit.documentNo = String(Math.ceil(Math.random() * 10e10));
          this.bodyCashDeposit.channel = "OzayConsulting";
         
          if (this.depositObj.selfdeposit == "otheraccount") {
            this.bodyCashDeposit.narrative = this.multideposit.depositorFullname + "," + this.multideposit.depositorPhoneNumber + "," + this.multideposit.depositorEmail + "," + this.multideposit.narration;
          } else {
            this.bodyCashDeposit.narrative = "Cash Dep by Self - " + this.multideposit.narration;
          }
          this.cashdeposit.body = this.bodyCashDeposit;
          this.LotusService.tellerCashDep(this.cashdeposit,"",this.AuthenService.imei.value).subscribe((data) => {
            if (!data.hasError) {
              
              window.setTimeout(() => {
                this.processCompleted = true; this.depositService.store({});
                this.shortcutService.showToast(`Deposit Number ${i} Posted Successfully`, 'success');
              }, 5000)
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
        });
      } else {
        let cshdem = [];
        var amt = this.depositObj.amount.replace(/,/g, "");
        this.bodyCashDeposit.depositAmount = amt;
        this.denomination.denomination = 'NGN5';
        this.denomination.unit = String(Number(amt) / 5);
        this.cashdenomination.push( this.denomination);
        this.bodyCashDeposit.denominationValues = this.cashdenomination;      
        this.bodyCashDeposit.creditAccount = this.depositObj.accountNumber;
        this.bodyCashDeposit.narrative = this.depositObj.narration;
        this.bodyCashDeposit.documentNo = String(Math.ceil(Math.random() * 10e10)) ;
        this.bodyCashDeposit.channel = "OzayConsulting";
        
        if (this.depositObj.selfdeposit == "otheraccount") {
          this.bodyCashDeposit.narrative = this.depositObj.depositorFullname + "," + this.depositObj.depositorPhoneNumber + "," + this.depositObj.depositorEmail + "," + this.depositObj.narration;
        } else {
          this.bodyCashDeposit.narrative = "Cash Dep by Self - " + this.depositObj.narration;
        }
        this.cashdeposit.body = this.bodyCashDeposit;
        this.LotusService.tellerCashDep(this.cashdeposit,"",this.AuthenService.imei.value).subscribe((data) => {         
          if (!data.hasError) {
            
            window.setTimeout(() => {
              this.processCompleted = true; this.depositService.store({});
              this.shortcutService.showToast('Deposit Posted Successfully', 'success');
            }, 5000)
          } else {
            this.showProcessing = false;
            this.shortcutService.showErrorToast('Error While Posting Deposit')
          }
         
        }, (error) => {
            console.log(error);
    })
      }
    })

 
   
  }

  processingButtonClicked(){
    this.showProcessing = false
    this.router.navigateByUrl('/deposit/receipt')
    // this.router.navigateByUrl('/')
  }
  goedit() {
    var isEmpty = false;
    for (var a in this.multideposit) {
      isEmpty = true;
    }
    if (isEmpty) {
     this.router.navigate(['/multideposit']);
    } else {
      this.router.navigateByUrl('/cashdeposit');
    }
    
}
  goBack(){
    this.navCtrl.back()
  }

  processingClicked(){
    
  }

}
