import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankAccount, BankService } from 'src/app/_services/bank.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {
  acctBal: number = 20000;
  amount?: number;
  bankAccount: string;
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
    private shortcuts: ShortcutsService
  ) { }

  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }
  ionViewWillEnter(){
this.allacct = this.bankService.getallaccount()
    console.log(this.bankService.getallaccount())
this.activatedroute.queryParams.subscribe(data=>{

  if(data.trftype){
if(data.trftype == 'own'){this.transferType = "Own Account Transfer"}
if(data.trftype == 'lotus'){this.transferType = "Lotus Bank"}  
if(data.trftype == 'other'){this.transferType = "Other Banks"}  
}
})
    this.transferService.get().subscribe((data: any) => {
      this.transfer = data
      this.acctBal = this.transfer.balance
    })
  }
  ngOnInit() {}
  submit(){
    this.loadingBankAccount = true
    this.bankService.getBankByAccountNumber(this.bankAccount).subscribe((bank: BankAccount) => {
      this.loadingBankAccount = false
      this.transfer.toAccountNo = this.bankAccount
      this.transfer.toAccountName = bank.name
      this.transfer.amount = this.amount
      this.transfer.bank = this.bankType
      this.transferService.store(this.transfer).then(() => {
        this.router.navigateByUrl('fundtransfer/confirm')
      })
    }, () => {
      this.loadingBankAccount = false
      this.shortcuts.showErrorToast('Error fetching account details')
    })
  }

  goBack(){
    this.navCtrl.back()
  }

}
