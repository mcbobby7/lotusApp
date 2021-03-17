import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { nipenquiry } from 'src/app/_models/bankModel';
import { ApiProvider } from 'src/app/_services/api.service';
import { BankAccount, BankService } from 'src/app/_services/bank.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
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
  bankType: string;
  transfer: FundTransfer = {}
  loadingBankAccount = false;
  transferType: string = '';
  allacct = [];
  allbanks = [];
  nimEnquiryObj: nipenquiry = {}
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private transferService: TransferService,
    private shortcuts: ShortcutsService,
    private inpVali: InputvalidationService,
    private apiService: ApiProvider,
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
    this.apiService.getBanksList().subscribe(data => {
      this.allbanks = data.body;
    })
  }

  submit(){
    if(!this.bankType || !this.tobankAccount){
      this.shortcuts.showErrorToast('Please Select Beneficiary Bank and Account Number')
    }else
    {

      this.loadingBankAccount = true
      this.nimEnquiryObj.ChannelCode = "OzayConsulting";
      this.nimEnquiryObj.destinationInstitutionCode = this.bankType;
      this.nimEnquiryObj.accountNumber = this.tobankAccount;
      this.apiService.nipNameEnquiry(this.nimEnquiryObj).subscribe(data => {
        this.transfer.toAccountNo = this.tobankAccount;
        this.transfer.toAccountName = data.AccountName;
        this.transfer.tobankCode = this.bankType; 
        this.transfer.NameEnquiryRef = data.NameEnquiryRef;
        this.transfer.beneficiaryaccountbvn = data.BankVerificationNo;
        this.transfer.tobank = this.allbanks.find(x => x.institutionCode == this.bankType).institutionName;
        this.loadingBankAccount = false;
        this.transferService.store(this.transfer).then(() => {
          this.router.navigateByUrl('localtransferdetails')
        })

      }, () => {
        this.loadingBankAccount = false
        this.shortcuts.showErrorToast('Error fetching account details')
      })



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
