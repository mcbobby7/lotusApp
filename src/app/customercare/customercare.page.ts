import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-customercare',
  templateUrl: './customercare.page.html',
  styleUrls: ['./customercare.page.scss'],
})
export class CustomercarePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  
  goback(){
    this.navCtrl.back();
  }

}
