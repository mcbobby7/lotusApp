import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {
  acctBal: number = 20000;
  amount?: number;
  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }

  ngOnInit() {
  }
  submit(){  
      this.router.navigateByUrl('fundtransfer/confirm')
  }

  goBack(){
    this.navCtrl.back()
  }

}
