import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthServiceProxy, User, UserLoginPayload,LotusServiceProxy,IGetAccountDetailsResponse  } from '../_services/service-proxies';
import {GlobalalertservicesService } from '../_services/globalalertservices.service';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
  loginForm: FormGroup;
  show: boolean = false;
  LoginResource = new UserLoginPayload().clone();
  newUser = new User().clone();
  loading: any;
  ForgotPasswordViewModel: any = "";
  nxtRoute: string = "";
    customerAccountResp: IGetAccountDetailsResponse;
  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private loadspinner: LoadingController,
    private toastCtrl: ToastController,
    private loginService: AuthServiceProxy,
    private AuthenService: AuthenticationService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private GalertService: GlobalalertservicesService,
    private LotusService: LotusServiceProxy,
  ) { }
  viewpassword() {
    this.show = !this.show;
   }
  goBack(){
    this.navCtrl.back()
  }
  async loginUser(){
    this.GalertService.gPresentLoading('Please wait...');
    this.LoginResource.authMode = "pin";
    this.loginService.login(this.LoginResource,"",'').subscribe(async (data)=>{
      if(!data.hasError){
        this.newUser = data.result;
        this.AuthenService.addUser(this.newUser);
        this.GalertService.gPresentToast(data.message, "success");     
        this.router.navigate([this.nxtRoute]);
        this.GalertService.gdismissLoading();
      } else {
        this.GalertService.gPresentToast(data.message, "danger");   
        this.GalertService.gdismissLoading();
      }
     
    }, async error => {
      this.GalertService.gPresentToast("Oops! something went wrong", "danger");   
      this.GalertService.gdismissLoading();
            });

   
  
    }
  async forgotPassword(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forgot Password',
      message: 'Please input your Email to receive password reset link',
      inputs: [
        {
          name: 'femail',
          type: 'text',
          placeholder: 'E-mail Address',
          
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
          text: 'Send Link',
          handler: async (femail) => {
           // console.log(femail.femail);
           this.GalertService.gPresentLoading('Please wait...');
           this.GalertService.gdismissLoading();
           
          }
        }
      ]
    });
  
    await alert.present();

  }

  async sendOTP() {   
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'Sent OTP',
      message: 'Please input your Username/Account Number to receive OTP',
      inputs: [
        {
          name: 'fuseraccount',
          type: 'text',
          placeholder: 'Username/Account Number',
          
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
          text: 'Send OTP',          
          handler: async (data) => {
            if (data.fuseraccount) {
              var uAccountNumber = data.fuseraccount;
              this.GalertService.gPresentLoading('Please wait...');
    this.LotusService.getAccountDetails(data.fuseraccount,'','').subscribe((data) => {
          this.customerAccountResp = data.result;
           if (!data.hasError && this.customerAccountResp.body) {
                   this.loginService.sendOTP(uAccountNumber, "",'').subscribe(dataResp => {
                if (!dataResp.hasError) {
                  this.GalertService.gdismissLoading();
                 this.router.navigate(['otpvalidation'], { queryParams: { useraccount: uAccountNumber,nxtRoute: this.nxtRoute } }); 
                } else {
                  this.GalertService.gPresentToast("Error - something went wrong while sending OTP, kindly update your account phone Number", "danger",6000);
                   this.GalertService.gdismissLoading();
                }
                 // this.router.navigate(['otpvalidation'], { queryParams: { useraccount: uAccountNumber,nxtRoute: this.nxtRoute } }); 
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
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.router.navigate(['dashbord'])
        } else {
          this.activatedroute.queryParams.subscribe(routedata => {
            if (routedata) {
              if (routedata.nxtRoute) {
                this.nxtRoute = routedata.nxtRoute;
          }
        }
      })
        }
      } else {
        this.activatedroute.queryParams.subscribe(routedata => {
          if (routedata) {
            if (routedata.nxtRoute) {
              this.nxtRoute = routedata.nxtRoute;
        }
      }
    })
      }
    })

   }
}
