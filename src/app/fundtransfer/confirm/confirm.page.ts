import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  processCompleted = false
  transfer: FundTransfer = {}
  showProcessing = false
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private transferService: TransferService
  ) { }

  ngOnInit() {
    this.transferService.get().subscribe(data => {
      this.transfer = data
    })
  }

  processingButtonClicked(){
    // this.router.navigateByUrl('deposit/receipt')
    this.router.navigateByUrl('/')
  }
  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 3000)
  }

  goBack(){
    this.navCtrl.back()
  }
}
