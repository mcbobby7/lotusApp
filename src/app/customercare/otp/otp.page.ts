import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
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
