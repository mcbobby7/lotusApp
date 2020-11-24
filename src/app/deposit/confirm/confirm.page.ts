import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  depositObj: Deposit = {}
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private depositService: DepositService
  ) { }

  ngOnInit() {
    this.depositService.get().subscribe(data => {
      this.depositObj = data
    })
  }

  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 5000)
  }

  processingButtonClicked(){
    this.showProcessing = false
    // this.router.navigateByUrl('/deposit/receipt')
    this.router.navigateByUrl('/')
  }

  goBack(){
    this.navCtrl.back()
  }

  processingClicked(){
    
  }

}
