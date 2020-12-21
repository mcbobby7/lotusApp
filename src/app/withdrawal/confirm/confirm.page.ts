import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  withdrawal: Withdrawal = {}

  processCompleted = false
  showProcessing = false
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private withdrawalService: WithdrawalService
  ) { }
  ionViewWillEnter(){
    this.withdrawalService.get().subscribe(data => {
      this.withdrawal = data
    })
  }
  ngOnInit() {

  }

  processingButtonClicked(){
    this.router.navigateByUrl('withdrawal/receipt')
    // this.router.navigateByUrl('/')
  }
  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true;this.withdrawalService.store({})}, 3000)
  }

  goBack(){
    this.navCtrl.back()
  }
}
