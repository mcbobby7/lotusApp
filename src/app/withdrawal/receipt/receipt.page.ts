import { Component, OnInit } from '@angular/core';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';
import {WithdrawaltypeComponent} from '../../withdrawal/withdrawaltype/withdrawaltype.component';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  withdrawal: Withdrawal = {}
  constructor(public popoverController: PopoverController,private router: Router,
    private withdrawalService: WithdrawalService
  ) { }
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
    if(val == "cheque")this.router.navigate(['/withdrawal/cheque-withdrawal']);
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }
  goBack(){
    this.router.navigate(['dashbord'])
      }
      ionViewWillEnter(){
        this.withdrawalService.get().subscribe(data => this.withdrawal = data)
      }
  ngOnInit() {

  }

}
