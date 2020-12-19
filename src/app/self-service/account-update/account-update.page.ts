import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
      Validators.minLength(10),
      Validators.maxLength(13)
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
