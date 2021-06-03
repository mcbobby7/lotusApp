import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,ToastController,AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalalertservicesService } from '../_services/globalalertservices.service';
import { AuthServiceProxy, IGetAccountDetailsResponse, LotusServiceProxy, User,UserLoginPayload } from '../_services/service-proxies';

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
  nxtRoute: string = '';
  newUser = new User().clone();
  customerAccountResp: IGetAccountDetailsResponse;
  LoginResource = new UserLoginPayload().clone();
  regUser = new User().clone();
  constructor(private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private loading: LoadingController,
    private AuthenService: AuthenticationService,
    private GalertService: GlobalalertservicesService,
    private loginService: AuthServiceProxy,
    private LotusService: LotusServiceProxy,) { }
  
  ionViewWillEnter() {
  this.code1 = '';
  this.code2 = '';
  this.code3 = '';
  this.code4 = '';
  this.code5 = '';
  this.code6 = '';
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
        this.loginService.getAllUsers(this.username, false, undefined, '', '').subscribe(data => {
          console.log(data.result)
        })

        this.GalertService.gdismissLoading();
        this.nxtRoute = data.nxtRoute;
        
      }
      if (data.newUser) {
        this.regUser = JSON.parse(data.newUser);
        console.log(this.regUser)
      }

    })
  }
  saveUser() {
    this.loginService.saveUser(this.regUser,"","").subscribe(async (data)=>{
      if(!data.hasError){  
        this.GalertService.gPresentToast(data.message, "success");       
        this.GalertService.gdismissLoading();
        this.router.navigate([this.nxtRoute]);
      } else {
        this.GalertService.gPresentToast(data.message, "danger");   
        this.GalertService.gdismissLoading();
      }
     
    }, async error => {
      this.GalertService.gPresentToast("Oops! something went wrong", "danger");   
      this.GalertService.gdismissLoading();
            });  
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
     this.loginService.sendOTP(this.username, "",this.AuthenService.imei.value).subscribe(data => {
       if (!data.hasError) {
        this.GalertService.gdismissLoading();
        this.GalertService.gPresentToast(data.message, "success");  
       } else {
        this.GalertService.gdismissLoading();
        this.GalertService.gPresentToast("Error - something went wrong while sending OTP, kindly update your account phone Number", "danger",6000); 
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
      this.loginService.verifyOTP(this.username,Number(receivedotp), '', this.AuthenService.imei.value).subscribe(dataResp => {
        if (!dataResp.hasError) {
          this.newUser = dataResp.result;
          this.AuthenService.addUser(this.newUser);
          this.GalertService.gdismissLoading();
          this.GalertService.gPresentToast(dataResp.message, "success");
          if (this.regUser) {
            this.saveUser();
          } else {
            this.router.navigate([this.nxtRoute]);
          }
       
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
 
  async otherAuthOption() {
    await this.loginService.refreshCustomerInfo(this.username, '', '').toPromise();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'Authentication',
      message: 'Please input your Date of Birth',
      inputs: [
        {
          name: 'dob',
          type: 'date',
          placeholder: '',
          
        }],
      buttons:  [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Verify',          
          handler: async (data) => {
            if (data.dob) {
              var userdateofBirth = data.dob;
              this.GalertService.gPresentLoading('Please wait...');            
    this.LotusService.getAccountDetails(this.username,'','').subscribe((data) => {
      this.customerAccountResp = data.result;      
      if (!data.hasError && this.customerAccountResp.body) {
        this.LoginResource.username = "dob";
        this.LoginResource.pIN = "dob";
        this.LoginResource.authMode = "dob";
        this.LoginResource.dOB = userdateofBirth;
        this.loginService.login(this.LoginResource, "",'').subscribe(dataResp => {
          if (!dataResp.hasError) {
            this.newUser = dataResp.result;
            this.AuthenService.addUser(this.newUser);
                  this.GalertService.gdismissLoading();
                  this.GalertService.gPresentToast(dataResp.message, "success");
                  if (this.regUser) {
                    this.saveUser();
                  } else {
                    this.router.navigate([this.nxtRoute]);
                  }
                } else {
                  this.GalertService.gPresentToast("Error - something went wrong while verifying DOB, kindly update Date of Birth on your Account", "danger",6000);
                   this.GalertService.gdismissLoading();
                }
                 
              });
 
           }else {
  
            this.GalertService.gPresentToast(data.message, "danger");
          }
    });
                          
             
        
            } else {
              this.GalertService.gPresentToast("Please Input User Details", "danger");
            }
          
           
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {}
  goback(){
    this.navCtrl.back();
  }

}
