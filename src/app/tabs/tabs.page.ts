import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  isAuthenticated = false;
  constructor(
    private auth: AuthService,
    private userService: AuthenticationService
  ) {}

  ngOnInit(){
    this.userService.getuser().then((data: any[]) => {
      if(data.length > 0){
        this.isAuthenticated = true
      }
    })
    this.auth.authenticated.subscribe(data => {
      this.isAuthenticated = Boolean(data)
    })
    this.userService.justAuthenticated.subscribe(data => {
      this.isAuthenticated = true
    })
  }

}
