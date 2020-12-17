import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loadingBankAccount = false
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private transferService: TransferService,
    private shortcuts: ShortcutsService
  ) { }

  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }

  ngOnInit() {
    this.transferService.get().subscribe((data: any) => {
      this.transfer = data
      this.acctBal = this.transfer.balance
    })
  }
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
