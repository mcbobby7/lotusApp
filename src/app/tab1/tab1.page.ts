import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  isAuthenticated = false
  name = 'Guest'
  constructor(
    private router: Router,
    private userService: AuthenticationService,
    private authService: AuthService
  ) {}

  ngOnInit(){

    this.userService.justAuthenticated.subscribe(user => {
      this.isAuthenticated = true
      this.name = user.first_name
    })
    this.userService.getuser().then((data: any) => {
      if(data.length > 0){
        this.name = data[0].first_name
      }
    })
  }
  gotofundtransfer(){
    this.router.navigateByUrl('/fundtransfer')
  }
  gotoWithdrawal(){
    this.router.navigateByUrl('/withdrawal')
  }

  gotoDeposit(){
    this.router.navigateByUrl('/deposit')
  }

  gotoCustomerService(){
    this.router.navigateByUrl('/tabs/tab3')
  }

  gotoEnquiries(){
    this.router.navigateByUrl('/tabs/tab2')
  }

}
