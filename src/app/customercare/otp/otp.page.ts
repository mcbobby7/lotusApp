import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  submit(){
    this.authService.updateuser({first_name: 'Garba', id: 1, user_id: 1})
    this.router.navigateByUrl('/tabs/tab1')
  }
  
  goback(){
    this.navCtrl.back();
  }


}
