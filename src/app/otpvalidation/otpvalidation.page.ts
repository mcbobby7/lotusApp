import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,ToastController,AlertController, LoadingController } from '@ionic/angular';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';
import { AuthServiceProxy } from '../_services/service-proxies';

@Component({
  selector: 'app-otpvalidation',
  templateUrl: './otpvalidation.page.html',
  styleUrls: ['./otpvalidation.page.scss'],
})
export class OtpvalidationPage implements OnInit {
  code1 = '';
  code2 = '';
  code3 = '';
  code4 = '';
  code5 = '';
  code6 = '';
  startSpinner: boolean = false;
processCompleted: boolean = false;
  nextRoute: any = '';
  toPage = '';
  username: any = '';
  constructor(private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router,
    private loading: LoadingController,
    private GalertService: GlobalalertservicesService,
    private loginService: AuthServiceProxy,) { }
  
  ionViewWillEnter() {
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data)
      if (data.nxtRoute) {
        this.nextRoute = data.nxtRoute;
      }
      if (data.toPage) {
        this.toPage = data.toPage;

      }
      if (data.useraccount) {
        this.username = data.useraccount;
        this.GalertService.gdismissLoading();
 
        
      }

    })
  }
  async goToSelfService(){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Verifying...',
      duration: 3000
    });
    await loading.present();
    // this.routes.navigate(['/selfservice'])
    this.router.navigateByUrl(this.toPage)
  }

  async codeValidation(nextElement,codeElement,value){
    var reg = new RegExp('^[+.0-9]+$');
    if(value !== "" && value && reg.test(value)){
      //if(codeElement != "code6")
      nextElement.setFocus();
    }else{
   if(codeElement == "code1") this.code1 = "";
   if(codeElement == "code2") this.code2 = "";
   if(codeElement == "code3") this.code3 = "";
   if(codeElement == "code4") this.code4 = "";
   if(codeElement == "code5") this.code5 = "";
      if (codeElement == "code6") this.code6 = "";
      this.GalertService.gPresentToast("Input Number Only", "danger");
    }
  }
  async sendOTP() {
    this.GalertService.gPresentLoading('Please wait...');   
   if (this.username) { 
     this.loginService.sendOTP(this.username, "").subscribe(data => {
       if (!data.hasError) {
        this.GalertService.gdismissLoading();
        this.GalertService.gPresentToast(data.message, "success");  
       } else {
        this.GalertService.gdismissLoading();
        this.GalertService.gPresentToast(data.message, "danger");  
  }
     });
    
   } else {
    this.GalertService.gdismissLoading();
     this.GalertService.gPresentToast("Invalid User Details", "danger");
     this.router.navigate(['loginpage']);
   }
  }
  async verifyOTP() {
    this.GalertService.gPresentLoading('Please wait...');
    let receivedotp = this.code1 + this.code2 + this.code3 + this.code4 + this.code5 + this.code6;
    if (receivedotp) {
      this.loginService.verifyOTP(this.username, '', Number(receivedotp), '').subscribe(dataResp => {
        if (!dataResp.hasError) {
          this.GalertService.gdismissLoading();
          this.GalertService.gPresentToast(dataResp.message, "success");
          this.router.navigate(['dashbord']);
        } else {
          this.GalertService.gdismissLoading();
          this.GalertService.gPresentToast(dataResp.message, "danger");  
        }

      });
    }else {
      this.GalertService.gdismissLoading();
      this.GalertService.gPresentToast("Please input otp code received", "danger");
     }   
  }
 
  ngOnInit() {}
  goback(){
    this.navCtrl.back();
  }

}
