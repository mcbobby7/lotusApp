import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankService } from 'src/app/_services/bank.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
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
  innerValue: string = '';
  withdrawaltype = '';
  narration = '';
  chequeNo = '';
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private withdrawalService: WithdrawalService,
    private bankService: BankService,
    private inpVali: InputvalidationService,
    private activatedroute: ActivatedRoute
  ) { }
 
  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }
  ionViewWillEnter() {
    this.activatedroute.queryParams.subscribe(data => {
      if (data && data.withdrawaltype) {
        this.withdrawaltype = data.withdrawaltype;
      }
    });
    this.withdrawalService.get().subscribe(data => {
      this.withdrawal = data
      this.acctBal = this.withdrawal.balance
    });
  }
  ngOnInit() {
  
  }
  getAmount(event) {
    this.amount = event;
}
  submit(){
    this.withdrawalService.get().subscribe((data: any) => {
      this.withdrawalService.store({...data, amount: this.amount,narration:this.narration,chequeNo:this.chequeNo}).then(() => {
        this.router.navigateByUrl('withdrawal/confirm')
      })
    })
  }
  async avalidate(event) {
    var inputentry =  event.target.value;
    var valRes = this.inpVali.validate(event, 'amount')
    if(valRes){
      var amt = inputentry.replace(/,/g, "");
      var newamt = amt.replace('.', "");
      this.innerValue = this.inpVali.getCurrency(newamt);
      this.amount = (Number(newamt) / 100)
     }
  }
  goBack(){
    this.navCtrl.back()
  }
}
