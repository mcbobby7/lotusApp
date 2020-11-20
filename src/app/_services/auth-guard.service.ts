import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    
    this.auth.isAuthenticated().then(data=>{  
     //console.log(this.router.url);
      if(!data){      
        this.router.navigate(['customercare']);
        return false;
      }else{

      }
    })
    return true;
  }
}
