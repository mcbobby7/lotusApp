import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthServiceProxy, IUser, User } from './service-proxies';
import { Storage } from '@ionic/storage';
import { GlobalalertservicesService } from './globalalertservices.service';
@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router,private GalertService: GlobalalertservicesService,
    private AuthenService: AuthenticationService, private storage: Storage, private loginService: AuthServiceProxy) { }
  canLoad(routes: Route): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated().then(data => {
        this.storage.set('returnUrl', this.router.url);
        if (!data) {
          this.router.navigate(['auth']);
          resolve(false);
        } else {
          console.log('am auth')
          this.AuthenService.getuser().then((usersdata: IUser[]) => {           
            if (usersdata.length > 0) {              
             // this.GalertService.gPresentLoading('Please wait...');
              this.loginService.validateToken(usersdata[0].sessionToken,this.AuthenService.imei.value).subscribe(dataResp => {                
                if (!dataResp.hasError) {
                  this.GalertService.gdismissLoading();
                  resolve(true);
                } else {
                  this.AuthenService.clearusers();
                  resolve(false);
                }
      
              });             
            } else {
              this.AuthenService.clearusers();
              resolve(false);
            }
          });

        }
      });
    });
  }
}
