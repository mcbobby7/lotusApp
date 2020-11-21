import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  
  goback(){
    this.navCtrl.back();
  }
}
