import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

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
