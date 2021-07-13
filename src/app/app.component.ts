import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './_services/auth.service';
import { NgIdleService } from './_services/ng-idle.service';
import { AuthenticationService } from './_services/authentication.service';
import { GlobalalertservicesService } from './_services/globalalertservices.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    private ngIdle: NgIdleService,
    private AuthenService: AuthenticationService,
    private alertController: AlertController,
    private GalertService: GlobalalertservicesService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.AuthenService.globalUser.subscribe(data => {
        if (data.username) {
          this.initTimer(0.5, 0);
      
        
  }
})
    });
  }

  initTimer(firstTimerValue: number, secondTimerValue: number): void {
    // Timer value initialization
    this.ngIdle.USER_IDLE_TIMER_VALUE_IN_MIN = firstTimerValue;
    this.ngIdle.FINAL_LEVEL_TIMER_VALUE_IN_MIN = secondTimerValue;
    // end
 
    // Watcher on timer
    this.ngIdle.initilizeSessionTimeout();
    var count = false;
    this.ngIdle.userIdlenessChecker.subscribe(async (status: string) => {
      
      if (status == "STOPPED_TIMER" && !count) {
        count = true;
        this.AuthenService.clearusers();
       this.GalertService.gPresentToast("Invalid session timed-out", "dark",7000);   
          // const alert = await this.alertController.create({
          //   cssClass: 'my-custom-class',
          //   backdropDismiss: false,
          //   header: 'Alert',
          //   message: 'Invalid session timed-out',
          //   buttons:  [
          //     {
          //       text: 'Ok',
          //       role: 'cancel',
          //       cssClass: 'secondary',
          //       handler: (blah) => {
          //         alert.dismiss();
          //         console.log('Confirm Cancel: blah');
          //       }
          //     }
          //   ]
          // });
        //  await alert.present();    
      
    
      }

    });

  }
}
