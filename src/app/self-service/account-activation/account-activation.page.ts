import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.page.html',
  styleUrls: ['./account-activation.page.scss'],
})
export class AccountActivationPage {

  formValid = false
  profileForm = new FormGroup({
    inactivationReason: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    inactivityReason: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

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
