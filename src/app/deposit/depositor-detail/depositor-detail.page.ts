import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-depositor-detail',
  templateUrl: './depositor-detail.page.html',
  styleUrls: ['./depositor-detail.page.scss'],
})
export class DepositorDetailPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back()
  }

}
