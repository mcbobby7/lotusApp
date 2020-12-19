import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';
import { Subject } from 'rxjs';
import {DeposittypeComponent} from '../../deposit/deposittype/deposittype.component'
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private depositService: DepositService,
    public popoverController: PopoverController,
    private router: Router
  ) { }
  deposit: Deposit = {}

  ngOnInit() {
    this.depositService.get().subscribe(data => this.deposit = data)
  }
  goBack(){
this.router.navigate(['dashbord'])
  }
  async popdeposittype(){
    const subject = new Subject<string>()
    const modal = await this.popoverController.create({
      component: DeposittypeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(async val => {
      modal.dismiss()
      if(val){
    if(val == "cash")this.router.navigate(['cashdeposit']);
    if(val == "cheque")this.router.navigate(['chequedeposit']);
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }
  goback(){
    this.navCtrl.back();
  }
}
