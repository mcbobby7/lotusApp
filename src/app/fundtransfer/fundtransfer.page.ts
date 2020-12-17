import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankAccount, BankService } from '../_services/bank.service';
import { ShortcutsService } from '../_services/shortcuts.service';
import { TransferService } from '../_services/transfer.service';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.page.html',
  styleUrls: ['./fundtransfer.page.scss'],
})
export class FundtransferPage implements OnInit {
  formGroup = new FormGroup({
    accountNo: new FormControl('')
  })
  loadingBankAccount = false
  accountNo = ""
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private transferService: TransferService,
    private bankService: BankService,
    private shortcuts: ShortcutsService
  ) { }
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }
  
  submit(){
    this.loadingBankAccount = true
    this.bankService.getBankByAccountNumber(this.accountNo).subscribe((bank: BankAccount) => {
      this.loadingBankAccount = false
      this.transferService.store({
        accountNo: this.accountNo,
        accountName: bank.name,
        balance: bank.balance
      }).then(data => {
        this.loadingBankAccount = false
        this.router.navigate(['capturebiometric'], {queryParams: {nxtRoute: '/fundtransfer/amount'}})
      })
    }, () => {
      this.loadingBankAccount = false
      this.shortcuts.showErrorToast('Error - Invalid Account Number')
    })
  }

  goBack(){
    this.navCtrl.back()
  }
  ngOnInit() {
  }

}
