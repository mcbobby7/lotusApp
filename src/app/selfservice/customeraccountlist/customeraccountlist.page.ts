import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-customeraccountlist',
  templateUrl: './customeraccountlist.page.html',
  styleUrls: ['./customeraccountlist.page.scss'],
})
export class CustomeraccountlistPage implements OnInit {
  currentUser: any = "";
  constructor(private navCtrl: NavController, private AuthenService: AuthenticationService) { }
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
}
