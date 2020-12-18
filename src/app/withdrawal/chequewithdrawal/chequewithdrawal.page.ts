import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankAccount, BankService } from '../../_services/bank.service';
import { ShortcutsService } from '../../_services/shortcuts.service';
import { Withdrawal, WithdrawalService } from '../../_services/withdrawal.service';

@Component({
  selector: 'app-chequewithdrawal',
  templateUrl: './chequewithdrawal.page.html',
  styleUrls: ['./chequewithdrawal.page.scss'],
})
export class ChequewithdrawalPage implements OnInit {

  formGroup = new FormGroup({
    accountNo: new FormControl('')
  })

  withdrawal: Withdrawal = {}
  loadingAccountName = false
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
    private withdrawalService: WithdrawalService
  ) { }
  accountNo = ""
  ngOnInit() {}
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }

  submit(){
    this.loadingAccountName = true
    this.bankService.getBankByAccountNumber(this.accountNo).subscribe((bank: BankAccount) => {
      this.loadingAccountName = false
      const withdrawalForm: Withdrawal = {}
      withdrawalForm.accountName = bank.name
      withdrawalForm.accountNo = this.accountNo
      withdrawalForm.balance = bank.balance
      this.withdrawalService.store(withdrawalForm).then(data => {
        this.accountNo = '';
        this.router.navigate(['chequewithdrawalconfirm'], {queryParams: {nxtRoute: '/withdrawal/amount'}})
      })
    }, err => {
      this.loadingAccountName = false
      this.shortcuts.showErrorToast('Error - Invalid Account Number')
    })
  }

  goBack(){
    this.navCtrl.back()
  }

}
