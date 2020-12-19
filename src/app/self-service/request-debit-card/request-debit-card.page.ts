import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-request-debit-card',
  templateUrl: './request-debit-card.page.html',
  styleUrls: ['./request-debit-card.page.scss'],
})
export class RequestDebitCardPage {

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
