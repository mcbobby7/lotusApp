import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthServiceProxy, User, UserLoginPayload,LotusServiceProxy,IGetAccountDetailsResponse, UserAccount  } from '../_services/service-proxies';
import {GlobalalertservicesService } from '../_services/globalalertservices.service';
import { InputvalidationService } from '../_services/inputvalidation.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.page.html',
  styleUrls: ['./registerpage.page.scss'],
})
export class RegisterpagePage implements OnInit {
  loginForm: FormGroup;
  show: boolean = false;
  User = new User().clone();
  confirmpIN = "";
  accountNo = "";
  customerAccountResp: IGetAccountDetailsResponse;
  secQuest = [
    {
      "secQues": "what is your pet name",
      "secSeq": 1,
      "status": "A" 
    },
    {
      "secQues": "what is your nick name",
      "secSeq": 2,
      "status": "A"
    },
    {
      "secQues": "what is your name",
      "secSeq": 3,
      "status": "A"
    }
  ]
  nextRoute: any = '';
  constructor(    private navCtrl: NavController,
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
    public inpVali: InputvalidationService,) { }
  ionViewWillEnter() {
    this.User.pIN = "";
    this.User.userAccounts = [];
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data)
      if (data.nxtRoute) {
        this.nextRoute = data.nxtRoute;
      }
    });
   }
  viewpassword() {
    this.show = !this.show;
   }
  goBack(){
    this.navCtrl.back()
  }

    async loginUser(){  
      console.log(this.User);
          
      this.GalertService.gPresentLoading('Please wait...');
      this.LotusService.getAccountDetails(this.accountNo, "", this.AuthenService.imei.value).subscribe((data) => {
        this.customerAccountResp = data.result;
        console.log(this.customerAccountResp.body)
        if (!data.hasError && this.customerAccountResp.body) {
          let acctDet = this.customerAccountResp.body.find(x => x.longAccount == this.accountNo);
          this.User.fullName = acctDet.accountName
          this.User.emailAddress 
          this.User.phoneNo = acctDet.customerPhone;   
          this.User.isBackOfficeStaff = false;
          this.User.roleName = 'Customer'
          this.User.branchCode = acctDet.sortCode;
          this.User.isActive = true;
          var accObj = new UserAccount({
            id: undefined,
            userId: undefined,
            accountNo: this.accountNo,
            accountType: acctDet.accountCategory,
            accountName: acctDet.accountName,
            isDefault: true,
            isActive: acctDet.accountStatus == "Active" ? true : false,
          });
          this.User.userAccounts.push(accObj);
          this.loginService.sendOTP(this.accountNo, "",'').subscribe(dataResp => {
            if (!dataResp.hasError) {
              this.GalertService.gdismissLoading();
          
             this.router.navigate(['otpvalidation'], { queryParams: { useraccount: this.accountNo,nxtRoute: this.nextRoute, newUser: JSON.stringify(this.User) } }); 
             this.User = new User().clone();
             this.accountNo = "";
             this.confirmpIN = "";
            } else {
              this.GalertService.gPresentToast("Error - something went wrong while sending OTP, kindly update your account phone Number", "danger",6000);
               this.GalertService.gdismissLoading();
            }
   
          });        
        }else {
         this.GalertService.gPresentToast(data.message, "danger");
       }
       })
  
  
  
    }
  ngOnInit() {
  }

}
