import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.page.html',
  styleUrls: ['./account-verify.page.scss'],
})
export class AccountVerifyPage implements OnInit {

  constructor(private navCtrl: NavController,
    private loadingCtrl: LoadingController,private routes: Router) { }

    ionViewWillEnter(){
      setTimeout(this.goToSelfService.bind(this), 2000)
    }
  ngOnInit() {
    // setTimeout(this.goToSelfService, 2000)
  }

  goBack() {
    this.navCtrl.back()
  }

  async goToSelfService(){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Verifying...',
      duration: 3000
    });
    await loading.present();
    this.routes.navigate(['/selfservice'])
  }

}
