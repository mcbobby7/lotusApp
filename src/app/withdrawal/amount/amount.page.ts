import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankService } from 'src/app/_services/bank.service';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {
  withdrawal: Withdrawal = {}
  acctBal:number = 0;
  amount?: number;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private withdrawalService: WithdrawalService,
    private bankService: BankService
  ) { }
 
  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }

  ngOnInit() {
    this.withdrawalService.get().subscribe(data => {
      this.withdrawal = data
      this.acctBal = this.withdrawal.balance
    })
  }

  submit(){
    this.withdrawalService.get().subscribe((data: any) => {
      this.withdrawalService.store({...data, amount: this.amount}).then(() => {
        this.router.navigateByUrl('withdrawal/confirm')
      })
    })
  }

  goBack(){
    this.navCtrl.back()
  }
}
