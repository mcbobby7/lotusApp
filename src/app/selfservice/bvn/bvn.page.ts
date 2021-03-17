import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-bvn',
  templateUrl: './bvn.page.html',
  styleUrls: ['./bvn.page.scss'],
})
export class BvnPage implements OnInit {

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
