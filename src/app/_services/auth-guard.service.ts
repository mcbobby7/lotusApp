import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

export const POST_LOGIN_LINK_STORAGE_KEY = 'post_login_link'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,
    private storage: Storage) {}
  canActivate(): boolean {
    
    this.auth.isAuthenticated().then(data=>{  
     console.log(this.router.url);
      if(!data){      
        this.storage.set(POST_LOGIN_LINK_STORAGE_KEY, this.router.url).then(data => {
          this.router.navigate(['customercare']);
        })
        return false;
      }else{

      }
    })
    return true;
  }
}
