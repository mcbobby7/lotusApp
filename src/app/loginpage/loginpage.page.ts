import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthServiceProxy, User, UserLoginPayload } from '../_services/service-proxies';
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
  ForgotPasswordViewModel:any = "";
  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private loadspinner: LoadingController,
    private toastCtrl: ToastController,
    private loginService: AuthServiceProxy,
    private AuthenService: AuthenticationService,
    private router: Router,
    private GalertService: GlobalalertservicesService
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
    this.loginService.login(this.LoginResource,"").subscribe(async (data)=>{
      if(!data.hasError){
        this.newUser = data.result;
        this.AuthenService.addUser(this.newUser);
        this.GalertService.gPresentToast(data.message, "success");     
        this.GalertService.gdismissLoading();
        this.router.navigate(['dashbord']);
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
              this.GalertService.gPresentLoading('Please wait...');
              this.router.navigate(['otpvalidation'], { queryParams: { useraccount: data.fuseraccount } });              
              // this.loginService.sendOTP(data.fuseraccount, "").subscribe(dataResp => {
              //   if (!dataResp.hasError) {
              //     this.GalertService.gdismissLoading();
              //      this.router.navigate(['otpvalidation'], { queryParams: { useraccount: data.fuseraccount } });
              //   } else {
                  
              //   }
              // });
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

}
