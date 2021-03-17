import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  depositObj: Deposit = {}
  constructor(private navCtrl: NavController,
    private depositService: DepositService,) { }
  ionViewWillEnter() {
    
    this.depositService.get().subscribe((data:any) => {
      this.depositObj = data; 
      
    })
  }
  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
