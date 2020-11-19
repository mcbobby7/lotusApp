import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }
  amount = ""
  get disableSubmit(){
    return !(Number(this.amount) > 0)
  }

  ngOnInit() {
  }
  submit(){
    this.router.navigateByUrl('withdrawal/confirm')
  }

  goBack(){
    this.navCtrl.back()
  }
}
