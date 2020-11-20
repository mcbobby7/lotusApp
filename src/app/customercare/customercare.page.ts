import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-customercare',
  templateUrl: './customercare.page.html',
  styleUrls: ['./customercare.page.scss'],
})
export class CustomercarePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(){
    this.router.navigateByUrl('/customercare/password')
  }

  
  goback(){
    this.navCtrl.back();
  }

}
