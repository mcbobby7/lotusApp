import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

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
