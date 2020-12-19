import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  formValid = false
  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNo: new FormControl('', [
      Validators.required,
      phoneNumberValidator()
    ]),
  });

  get email() { return this.profileForm.get('email'); }

  get phoneNo() { return this.profileForm.get('phoneNo'); }

  prefferedLocation: string;
  page = 0
  details: any = {}
  constructor(
    private router: Router,
    private navController: NavController
  ) { }

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
