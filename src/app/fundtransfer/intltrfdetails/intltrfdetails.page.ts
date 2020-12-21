import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private transferService: TransferService,
    private shortcuts: ShortcutsService,
    private inpVali: InputvalidationService,
  ) { }

  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }
  ionViewWillEnter(){
    this.transferService.get().subscribe(data => {
      this.transfer = data
    })
  }
  ngOnInit() {}
  submit(){
    if(!this.bankType || !this.tobankAccount){
      this.shortcuts.showErrorToast('Please Select Beneficiary Bank and Account Number')
    }else
   { this.loadingBankAccount = true
      this.bankService.getBankByAccountNumber(this.tobankAccount).subscribe((tobank: BankAccount) => {
        this.transfer.toAccountNo = this.tobankAccount;
        this.transfer.toAccountName = tobank.name
        this.transfer.tobank = this.bankType
        this.loadingBankAccount = false;
        this.transferService.store(this.transfer).then(() => {
          this.router.navigateByUrl('localtransferdetails')
        })
      }, () => {
        this.loadingBankAccount = false
        this.shortcuts.showErrorToast('Error fetching Debit account details')
      })
 
  }
  }

  goBack(){
    this.navCtrl.back()
  }

}
