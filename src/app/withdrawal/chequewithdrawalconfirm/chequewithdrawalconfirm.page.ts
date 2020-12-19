import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chequewithdrawalconfirm',
  templateUrl: './chequewithdrawalconfirm.page.html',
  styleUrls: ['./chequewithdrawalconfirm.page.scss'],
})
export class ChequewithdrawalconfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  constructor( private router: Router,) { }
  ionViewWillEnter(){
    this.processCompleted = false;
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 5000)
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
