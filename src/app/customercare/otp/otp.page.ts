import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(){
    this.router.navigateByUrl('/customercare/otp')
  }
  
  goback(){
    this.navCtrl.back();
  }


}
