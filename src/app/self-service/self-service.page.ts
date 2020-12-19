import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-self-service',
  templateUrl: './self-service.page.html',
  styleUrls: ['./self-service.page.scss'],
})
export class SelfServicePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
