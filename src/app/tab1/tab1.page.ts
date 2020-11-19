import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router
  ) {}

  gotoWithdrawal(){
    this.router.navigateByUrl('/withdrawal')
  }

  gotoDeposit(){
    this.router.navigateByUrl('/deposit')
  }

  gotoCustomerService(){
    this.router.navigateByUrl('/tabs/tab2')
  }

  gotoEnquiries(){
    this.router.navigateByUrl('/tabs/tab3')
  }

}
