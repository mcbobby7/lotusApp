import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User, UserClass } from "../_models/user";


@Injectable()
export class AuthService {
    main_id = 0;
    user: User={}
    authstatus: boolean = false;
 constructor(public authServ: AuthenticationService,
    ){}

public async isAuthenticated(){
return new Promise((resolve, reject) => {   
  this.authServ.getuser().then(async users=>{
  //  console.log(users[0]);

    this.user = users[0];    
  // console.log(this.user)
    if (this.user) {
      this.main_id = this.user.id;
    //  console.log('User in App Components: ', this.user);
      let auStatus = false;
      if (this.user.user_id > 0) {
 
        } else {
          this.authServ.clearusers();
          resolve(false);
          auStatus = false;
        }
        
    this.authstatus = auStatus;
  
}else{
  this.authServ.clearusers();
              resolve(false);
         
}
  });
});

}
}