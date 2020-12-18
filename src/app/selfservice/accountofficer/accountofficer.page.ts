import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accountofficer',
  templateUrl: './accountofficer.page.html',
  styleUrls: ['./accountofficer.page.scss'],
})
export class AccountofficerPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }
}
