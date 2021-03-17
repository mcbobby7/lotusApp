import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DeposittypeComponent } from '../deposit/deposittype/deposittype.component';
import { WithdrawaltypeComponent } from '../withdrawal/withdrawaltype/withdrawaltype.component';
import { IonicFingerPrintReader } from '@ionic-native/ionic-finger-print-reader/ngx';
import { AuthServiceProxy } from '../_services/service-proxies';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';

declare var window:any;
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.page.html',
  styleUrls: ['./dashbord.page.scss'],
})
export class DashbordPage implements OnInit {
  deviceName: any = '';
  loggedinUserfullName: any = '';
  constructor(private platform: Platform,
    private loginService: AuthServiceProxy,
    private AuthenService: AuthenticationService,
    public popoverController: PopoverController,
    private router: Router,
    private fingerservice: IonicFingerPrintReader,
    private GalertService: GlobalalertservicesService
  ) {
    this.initializeApp();
     }
 async popdeposittype(){
    const subject = new Subject<string>()
    const modal = await this.popoverController.create({
      component: DeposittypeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(async val => {
      modal.dismiss()
      if(val){
    if(val == "cash")this.router.navigate(['cashdeposit']);
    if(val == "cheque")this.router.navigate(['chequedeposit']);
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }


  async popwithdrawltype(){
    const subject = new Subject<string>()
    const modal = await this.popoverController.create({
      component: WithdrawaltypeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(async val => {
      modal.dismiss()
      if(val){
    if(val == "cash")this.router.navigate(['withdrawal']);
    if(val == "cheque")this.router.navigate(['/withdrawal/cheque-withdrawal']);
      } else {
       modal.dismiss()
      }
    })
    return await modal.present();
  }

  getfingers() {
    console.log('firing finger Service');
    this.fingerservice.getReader("").then(data => {
      console.log(data);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('firing finger Service');
      this.fingerservice.getReader("").then(data => {
        console.log(data);
      })
    });
  }

  logout() {
    this.GalertService.gPresentLoading('Please wait...');
    this.AuthenService.getuser().then(userdata => {
      this.loginService.logout(userdata[0].sessionToken).subscribe(dataResp => {
        if (!dataResp.hasError) {
          this.AuthenService.clearusers();
          this.GalertService.gPresentToast(dataResp.message, "success"); 
          this.router.navigate(['home'])
        } else {
        this.GalertService.gPresentToast(dataResp.message, "danger");   
        this.GalertService.gdismissLoading();
        }
      })
    })
 
  }
  ionViewWillEnter() {
    this.AuthenService.getuser().then(userdata => {
      this.loggedinUserfullName = userdata[0].fullName;

    })
  }
  ngOnInit() {
  }

}
