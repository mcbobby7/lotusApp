import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,ToastController,AlertController, LoadingController } from '@ionic/angular';

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
  toPage = ''
  constructor(private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router,
    private loading: LoadingController,) { }
  
  ionViewWillEnter() {
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data)
      if (data.nxtRoute) {
        this.nextRoute = data.nxtRoute;
      }
      if (data.toPage) {
        this.toPage = data.toPage;

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
   if(codeElement == "code6") this.code6 = "";
   const toast = await this.toastCtrl.create({
    duration: 3000,
    message: 'Input Number Only',
    color: "danger"
  });
  toast.present();
    }
  }
 async sendOTP() {
    const loading = await this.loading.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles", cssClass: 'my-loading-class'
    });
    loading.present();
   
    let receivedotp = this.code1 + this.code2 + this.code3 + this.code4 + this.code5 + this.code6;
   if (receivedotp) { 
    setTimeout(async() => {
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'OTP Sent successfully',
        color: "success"
      });
      toast.present();
      loading.dismiss();      
    }, 2000);
    
    }
  }
  async verifyOTP() {
    const loading = await this.loading.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles", cssClass: 'my-loading-class'
    });
    loading.present();
    setTimeout(async() => {
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'OTP Validated successfully',
        color: "success"
      });
      toast.present();
      loading.dismiss();
      let nRoute = this.nextRoute? this.nextRoute : this.toPage
      this.router.navigate([nRoute])
    }, 2000);
  }
 
  ngOnInit() {}
  goback(){
    this.navCtrl.back();
  }

}
