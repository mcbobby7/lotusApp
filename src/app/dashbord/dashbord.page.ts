import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import {DeposittypeComponent} from '../deposit/deposittype/deposittype.component'
import {WithdrawaltypeComponent} from '../withdrawal/withdrawaltype/withdrawaltype.component'
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.page.html',
  styleUrls: ['./dashbord.page.scss'],
})
export class DashbordPage implements OnInit {

  constructor(public popoverController: PopoverController,private router: Router) { }
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


  async popwithdrawltype(){
    const subject = new Subject<string>()
    const modal = await this.popoverController.create({
      component: WithdrawaltypeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(async val => {
      modal.dismiss()
      if(val){
    if(val == "cash")this.router.navigate(['withdrawal']);
    if(val == "cheque")this.router.navigate(['chequewithdrawal']);
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }
  ngOnInit() {
  }

}
