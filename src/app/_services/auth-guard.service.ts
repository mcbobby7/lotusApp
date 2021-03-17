import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthServiceProxy, IUser, User } from './service-proxies';
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router,
    private AuthenService: AuthenticationService, private storage: Storage, private loginService: AuthServiceProxy) { }
  canLoad(routes: Route): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated().then(data => {
        this.storage.set('returnUrl', this.router.url);
        if (!data) {
          this.router.navigate(['auth']);
          resolve(false);
        } else {
          this.AuthenService.getuser().then((usersdata: IUser[]) => {      
            if (usersdata.length > 0) {
              this.loginService.validateToken(usersdata[0].sessionToken).subscribe(dataResp => {
                if (!dataResp.hasError) {
                  resolve(true);
                } else {
                  this.router.navigate(['home']);
                  resolve(false);
                }
              });             
            } else {
              this.router.navigate(['home']);
              resolve(false);
            }
          });

        }
      });
    });
  }
}
