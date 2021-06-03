import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';

@Component({
  selector: 'app-customeraccountlist',
  templateUrl: './customeraccountlist.page.html',
  styleUrls: ['./customeraccountlist.page.scss'],
})
export class CustomeraccountlistPage implements OnInit {
  currentUser: any = "";
  bankAccount?: string = '';

  constructor(private navCtrl: NavController, private AuthenService: AuthenticationService,
    private inpVali: InputvalidationService, private router: Router) { }
  goBack() {
    this.navCtrl.back()
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.AuthenService.getuser().then(userdata => {
      if (userdata) {
        if (userdata.length > 0) {
          this.currentUser = userdata[0];
        //  console.log(this.currentUser)
        }
      }
    })
  }
  goHome() {
    this.router.navigate(['/dashbord'])
  }
  valbeneficiaryAccount() {
    if (!this.inpVali.invalidAccount && this.bankAccount.length == 10) {      
      this.router.navigate(['/selfservice/balance'], { queryParams: { accountNumber: this.bankAccount } });
    }
    return false;
  }
}
