import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private depositService: DepositService
  ) { }
  deposit: Deposit = {}

  ngOnInit() {
    this.depositService.get().subscribe(data => this.deposit = data)
  }

  
  goback(){
    this.navCtrl.back();
  }
}
