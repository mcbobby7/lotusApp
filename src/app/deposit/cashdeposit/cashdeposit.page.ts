import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { ApiProvider } from 'src/app/_services/api.service';
import { AuthServiceProxy, IGetAccountDetailsResponse, LotusServiceProxy } from 'src/app/_services/service-proxies';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-cashdeposit',
  templateUrl: './cashdeposit.page.html',
  styleUrls: ['./cashdeposit.page.scss'],
})
export class CashdepositPage implements OnInit {
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: Deposit = {singleDeposit: true,proceedChk: false};
  depositMultpleObj: multiDeposit ={accountInfo:[], multiDeposit: true};
  multideposit: multiDeposit = {}
  customerAccountResp: IGetAccountDetailsResponse;
  constructor(    
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService,
    private apiService: ApiProvider,
    private LotusService: LotusServiceProxy,
    private GalertService: GlobalalertservicesService,
    private AuthenService: AuthenticationService,) { }
  goBack() {
    this.router.navigate(['/dashbord']);
  }
  avalidate(event,fieldelement){
  var inputentry =  event.target.value;
 var valRes =  this.inpVali.validate(event,fieldelement);
 if(valRes && fieldelement == "amount" ){
  var amt = inputentry.replace(/,/g, "");
  var newamt = amt.replace('.', "");
  this.depositObj.amount = this.inpVali.getCurrency(newamt);
    }
    if (valRes && fieldelement == "accountNumber") { 
 
    }
  }
  validateForm() {
    if (this.depositObj.accountNumber) {
      return true
    }
    return false
  }

  addDeposit(){
    this.router.navigate(['/multideposit'])
  }

  
 
 
  submitRequest(depositDetails) {
    if (this.validateForm()) {
      this.GalertService.gPresentLoading('Please wait...');
      this.loadingBankAccount = true;
      this.AuthenService.getuser().then(userDetails => {
        this.LotusService.getAccountDetails(this.depositObj.accountNumber,'',this.AuthenService.imei.value).subscribe((data) => {
          this.customerAccountResp = data.result;
          if (!data.hasError && this.customerAccountResp.body) {
            this.GalertService.gPresentToast(data.message, "success");
            this.loadingBankAccount = false;           
            let acctDet = this.customerAccountResp.body;
            this.depositObj.singleDeposit = true;
            this.depositObj.bankName = "Lotus Bank";
            this.depositObj.accountName = acctDet[0].accountName;
            this.depositService.store(this.depositObj).then(data => {
              this.router.navigate(['/singledeposit'], { queryParams: { depositDetails: JSON.stringify(depositDetails) } })
            })
          } else {
            this.loadingBankAccount = false;
            this.GalertService.gPresentToast(data.result.error.message, "danger");
            console.log(data.result.error.message);
            console.log("error");
            
            
          }
          this.GalertService.gdismissLoading();
          
  },() => {
          this.loadingBankAccount = false
          this.GalertService.gdismissLoading();
    this.shortcutService.showErrorToast('Invalid account number')
  })
      });
 
    } else {
      this.GalertService.gPresentToast('Please fill all required fields', "danger");
    }
  }
  ionViewWillEnter() {    
    this.depositService.get().subscribe((data:any) => {
      if (data) {
        if (data.multiDeposit) {
          this.multideposit = data;
          this.depositObj = data
    
        } else {
          this.depositObj = data 
        }
}
      
      
    })
  }
  ngOnInit() {
  }

}
