import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { nipenquiry } from 'src/app/_models/bankModel';
import { ApiProvider } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { BankAccount, BankService } from 'src/app/_services/bank.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { IGetAccountDetailsResponse, LotusServiceProxy,NameEnquiryPayload, NameEnquiryResponse,BankResponseModelBody } from 'src/app/_services/service-proxies';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-intltrfdetails',
  templateUrl: './intltrfdetails.page.html',
  styleUrls: ['./intltrfdetails.page.scss'],
})
export class IntltrfdetailsPage implements OnInit {
  acctBal: number = 20000;
  amount?: number;
  bankAccount?: string = '';
  tobankAccount?: string = ''
  bankType: string = '';
  transfer: FundTransfer = {}
  loadingBankAccount = false;
  transferType: string = '';
  allacct = [];
  allbanks :BankResponseModelBody []=[];
  nimEnquiryObj: nipenquiry = {}
  currentUser: any = "";
  customerAccountResp: NameEnquiryResponse;
  nameEnquiry = new NameEnquiryPayload().clone();
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private transferService: TransferService,
    private shortcuts: ShortcutsService,
    private inpVali: InputvalidationService,
    private apiService: ApiProvider,
    private AuthenService: AuthenticationService,
    private lotusService: LotusServiceProxy,
    private GalertService: GlobalalertservicesService,
  ) { }

  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }
  ionViewWillEnter() {
    this.getallbanks();
    this.transferService.get().subscribe(data => {
      this.transfer = data
    })
  }
  ngOnInit() { }
  getallbanks() {
    this.AuthenService.getuser().then(userdata => {
      this.lotusService.fetchBanks(userdata[0].sessionToken,this.AuthenService.imei.value).subscribe(banksdata => {
        if (!banksdata.hasError) {
          this.allbanks = banksdata.result.body;
        }
        else {
          
        }

      })
    });
   
    //   this.allbanks = [
    //     { "id": "1", "name": "Access Bank" ,"code":"044" },
    //     { "id": "2", "name": "Citibank","code":"023" },
    //     { "id": "3", "name": "Access Bank (Diamond)","code":"063" },
    //     { "id": "5", "name": "Ecobank Nigeria","code":"050" },
    //     { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
    //     { "id": "7", "name": "First Bank of Nigeria","code":"011" },
    //     { "id": "8", "name": "First City Monument Bank","code":"214" },
    //     { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
    //     { "id": "10", "name": "Heritage Bank Plc","code":"030" },
    //     { "id": "11", "name": "Jaiz Bank","code":"301" },
    //     { "id": "12", "name": "Keystone Bank Limited","code":"082" },
    //     { "id": "13", "name": "Providus Bank Plc","code":"101" },
    //     { "id": "14", "name": "Polaris Bank","code":"076" },
    //     { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
    //     { "id": "16", "name": "Standard Chartered Bank","code":"068" },
    //     { "id": "17", "name": "Sterling Bank","code":"232" },
    //     { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
    //     { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
    //     { "id": "20", "name": "United Bank for Africa","code":"033" },
    //     { "id": "21", "name": "Unity Bank Plc","code":"215" },
    //     { "id": "22", "name": "Wema Bank","code":"035" },
    //     { "id": "23", "name": "Zenith Bank","code":"057" }
    // ]
  }
  valbeneficiaryAccount() {
    if (!this.inpVali.invalidAccount && this.bankType) {      
      this.AuthenService.getuser().then(userDetails => {
        this.nameEnquiry.destinationInstitutionCode = this.bankType;
        this.nameEnquiry.channelCode = "OzayConsulting";
        this.nameEnquiry.accountNumber = this.tobankAccount;
        this.lotusService.nameenquiry(this.nameEnquiry, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
          this.customerAccountResp = data.result;
          if (!data.hasError) {            
            let acctDet = this.customerAccountResp;
            this.transfer.toAccountName = acctDet.accountName;
            this.transfer.toAccountNo = this.tobankAccount;
            return true;
           }
          else {
            this.GalertService.gPresentToast("Invalid Beneficiary Account", "danger");
            return false;
          }         
        });

       });
    } else {
     
    }
    return false;
} 
  submit(){
    if(!this.bankType || !this.tobankAccount){
      this.shortcuts.showErrorToast('Please Select Beneficiary Bank and Account Number')
    }else
    {

      this.loadingBankAccount = true
      this.nameEnquiry.destinationInstitutionCode = this.bankType;
      this.nameEnquiry.channelCode = "OzayConsulting";
      this.nameEnquiry.accountNumber = this.tobankAccount;
      this.AuthenService.getuser().then(userDetails => {
        this.lotusService.nameenquiry(this.nameEnquiry, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
          this.customerAccountResp = data.result;
          if (!data.hasError) {
            let acctDet = this.customerAccountResp;
            this.transfer.toAccountNo = this.tobankAccount;
            this.transfer.toAccountName = acctDet.accountName;
            this.transfer.tobankCode = this.bankType; 
            this.transfer.NameEnquiryRef = acctDet.nameEnquiryRef;
            this.transfer.beneficiaryaccountbvn = acctDet.bankVerificationNo;
            this.loadingBankAccount = false;
            this.transferService.store(this.transfer).then(() => {
              this.router.navigateByUrl('localtransferdetails')
            })
          } else {
            
           }
        },() => {
          this.loadingBankAccount = false
          this.shortcuts.showErrorToast('Error fetching account details')
        });
      });

      // this.nimEnquiryObj.ChannelCode = "OzayConsulting";
      // this.nimEnquiryObj.destinationInstitutionCode = this.bankType;
      // this.nimEnquiryObj.accountNumber = this.tobankAccount;
      // this.apiService.nipNameEnquiry(this.nimEnquiryObj).subscribe(data => {
      //   this.transfer.toAccountNo = this.tobankAccount;
      //   this.transfer.toAccountName = data.AccountName;
      //   this.transfer.tobankCode = this.bankType; 
      //   this.transfer.NameEnquiryRef = data.NameEnquiryRef;
      //   this.transfer.beneficiaryaccountbvn = data.BankVerificationNo;
      //   this.transfer.tobank = this.allbanks.find(x => x.institutionCode == this.bankType).institutionName;
      //   this.loadingBankAccount = false;
      //   this.transferService.store(this.transfer).then(() => {
      //     this.router.navigateByUrl('localtransferdetails')
      //   })

      // }, () => {
      //   this.loadingBankAccount = false
      //   this.shortcuts.showErrorToast('Error fetching account details')
      // })



      // this.bankService.getBankByAccountNumber(this.tobankAccount).subscribe((tobank: BankAccount) => {
      //   this.transfer.toAccountNo = this.tobankAccount;
      //   this.transfer.toAccountName = tobank.name
      //   this.transfer.tobank = this.bankType
      //   this.loadingBankAccount = false;
      //   this.transferService.store(this.transfer).then(() => {
      //     this.router.navigateByUrl('localtransferdetails')
      //   })
      // }, () => {
      //   this.loadingBankAccount = false
      //   this.shortcuts.showErrorToast('Error fetching Debit account details')
      // })
 
  }
  }

  goBack(){
    this.navCtrl.back()
  }

}
