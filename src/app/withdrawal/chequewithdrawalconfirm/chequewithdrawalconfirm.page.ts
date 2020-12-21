import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/_services/transfer.service';
import { WithdrawalService } from 'src/app/_services/withdrawal.service';

@Component({
  selector: 'app-chequewithdrawalconfirm',
  templateUrl: './chequewithdrawalconfirm.page.html',
  styleUrls: ['./chequewithdrawalconfirm.page.scss'],
})
export class ChequewithdrawalconfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  constructor( private router: Router, private withdrawalService: WithdrawalService) { }
  ionViewWillEnter(){
    this.processCompleted = false;
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true;this.withdrawalService.store({})}, 5000)
  }
  processingButtonClicked(){
    this.showProcessing = false
    this.router.navigateByUrl('/withdrawal/receipt')
    // this.router.navigateByUrl('/')
  }
  processingClicked(){
    
  }
  ngOnInit() {
  }

}
