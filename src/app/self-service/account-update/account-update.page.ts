import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { LotusServiceProxy,UpdateAccountInfoPayload,UpdateAccountInfoPayloadBody } from 'src/app/_services/service-proxies';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let phoneNo: string = control.value;
    phoneNo = phoneNo.replace("+", "")
    let forbidden = /\D/.test(phoneNo)
    if(!forbidden){
      if(phoneNo.length < 8){
        forbidden = true
      } else if(phoneNo.length > 13){
        forbidden = true
      }
    }
    return forbidden ? {phoneNo: {value: control.value}} : null 
  };
}

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.page.html',
  styleUrls: ['./account-update.page.scss'],
})
export class AccountUpdatePage{
  updateForm: FormGroup;
  prefferedLocation: string;
  page = 0
  details: any = {};
  UpdateAccountInfo = new UpdateAccountInfoPayload().clone();
  bodyUpdateAccountInfo = new UpdateAccountInfoPayloadBody().clone();
  accountDetailsResp = "";
  accountName = "";
  constructor(
    private router: Router,
    private navController: NavController,
    private AuthenService: AuthenticationService,
    private lotusService: LotusServiceProxy,
    private GalertService: GlobalalertservicesService,
    public inpVali: InputvalidationService,
  ) { }
  submitUpdateRequest() {
    this.GalertService.gPresentLoading('Please wait...');
    this.AuthenService.getuser().then(userDetails => {
      this.bodyUpdateAccountInfo.category = "Update";
      this.UpdateAccountInfo.body = this.bodyUpdateAccountInfo;
      this.lotusService.updateAccountInfo(this.UpdateAccountInfo, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe(data => {
        this.GalertService.gdismissLoading();
        if (!data.hasError) {
          this.GalertService.gPresentToast(data.message, "success");
          this.UpdateAccountInfo = new UpdateAccountInfoPayload().clone();
          this.page += 1;
        }
        else {
          this.GalertService.gPresentToast("Oops! Update Failed", "danger");
        }
      });
    });
}
  getAccountDetails() {
    if (this.bodyUpdateAccountInfo.accountNo.length == 10) {
      this.GalertService.gPresentLoading('Please wait...');
      this.AuthenService.getuser().then(userDetails => {
        this.lotusService.getAccountDetails(this.bodyUpdateAccountInfo.accountNo, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
          if (!data.hasError && data.result.body.length >0) {
           var accountResp = data.result.body.find(x=>x.longAccount == this.bodyUpdateAccountInfo.accountNo);
            this.accountName = accountResp.accountName;
            this.bodyUpdateAccountInfo.currency = accountResp.currencyCode;
          } else {
            this.GalertService.gPresentToast(data.message, "danger");
            this.accountName = '';
          }
          this.GalertService.gdismissLoading();
        }, error => {
          this.GalertService.gdismissLoading();
          this.accountName = '';
        });
       })
    }

  }
  ionViewWillEnter() {
    this.page = 0
  }

  submitLocation(){
    this.page += 1
  }
  submitBranch(){
    this.page = 2
  }
  submitAccount(){
    this.page = 2
  }
  submitAgreement(){
    this.page = 3
  }
  newRequest(){
    this.page = 0
    this.details = {}
    this.router.navigateByUrl('/self-service')
  }
  goBack(){
    if(this.page == 0){
      this.navController.back()
    } else {
      this.page -= 1
    }
  }
  goHome(){
    this.router.navigateByUrl('/dashbord')
  }
}
