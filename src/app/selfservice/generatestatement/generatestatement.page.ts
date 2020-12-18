import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generatestatement',
  templateUrl: './generatestatement.page.html',
  styleUrls: ['./generatestatement.page.scss'],
})
export class GeneratestatementPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
