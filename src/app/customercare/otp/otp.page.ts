import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
//import { POST_LOGIN_LINK_STORAGE_KEY } from 'src/app/_services/auth-guard.service';
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
    private router: Router,
    private authService: AuthenticationService,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  // submit(){
  //   const authenticated = this.authService.justAuthenticated
  //   this.authService.updateuser({first_name: 'Garba', id: 1, user_id: 1})
  //   authenticated.subscribe(data => {
  //     this.storage.get(POST_LOGIN_LINK_STORAGE_KEY).then(postLoginLink => {
  //       this.router.navigateByUrl(postLoginLink)
  //     })
  //   })
  // }
  
  goback(){
    this.navCtrl.back();
  }


}
