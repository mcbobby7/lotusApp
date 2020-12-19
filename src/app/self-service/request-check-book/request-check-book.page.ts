import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-request-check-book',
  templateUrl: './request-check-book.page.html',
  styleUrls: ['./request-check-book.page.scss'],
})
export class RequestCheckBookPage {
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

  selectCheckType(checkType){
    this.details.selectedType = checkType
  }

  submitType(){
    this.page = 1
  }
  submitLocation(){
    this.page = 2
  }
  submitAccount(){
    this.page = 3
  }
  submitAgreement(){
    this.page = 4
  }
  newRequest(){
    this.page = 0
    this.details = {}
  }
  goBack(){
    if(this.page == 0){
      this.navController.back()
    } else {
      this.page -= 1
    }
  }
  goHome(){
    this.router.navigateByUrl('/')
  }
}
