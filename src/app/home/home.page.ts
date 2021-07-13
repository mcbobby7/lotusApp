import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { DepositService } from '../_services/deposit.service';
import { WithdrawalService } from '../_services/withdrawal.service';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mode = "development"

  constructor(private router: Router, private navCtrl: NavController,
    private AuthenService: AuthenticationService,private depositService: DepositService,private withdrawalService: WithdrawalService) { }
  ionViewWillEnter() {
    this.AuthenService.clearusers();
    this.depositService.store({});
    this.withdrawalService.store({});
  }
  gotostart(){
 this.router.navigate(['dashbord'])
  }
  ngOnInit() {
    if(environment.production == true) {
      this.mode = "production"
      console.log("true");
      
    }else {
      this.mode == "development"
      console.log("false");
      
    }
  }

}
