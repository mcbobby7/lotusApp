import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.page.html',
  styleUrls: ['./request-card.page.scss'],
})
export class RequestCardPage implements OnInit {
  page = 1
  showProcessing = false
  processCompleted = false


  cardTypes = [
    {name: 'Mastercard', id: 1},
    {name: 'Visa', id: 2},
    {name: 'Verve', id: 3},
  ]

  pickUpLocations = [
    {name: 'Ikeja', id: 1},
    {name: 'Yaba', id: 2},
    {name: 'Lekki', id: 3},
  ]

  userAccounts = [
    {name: 'Account 1(Savings)', id: 1},
    {name: 'Account 2(Savings)', id: 2},
    {name: 'Account 3(Savings)', id: 3},
  ]

  constructor(
    private router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.page == 1){
      this.page = 2
    } else {
      this.showProcessing = true
      window.setTimeout(()=>{this.processCompleted = true}, 3000)  
    }
  }

  processingButtonClicked(){
    this.router.navigateByUrl('/tabs/tab1')
  }

  goBack(){
    if(this.page == 2){
      this.page = 1
    } else {
      this.navCtrl.back()
    }
  }
}
