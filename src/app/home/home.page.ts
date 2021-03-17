import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router,private navCtrl: NavController) { }
  gotostart(){
 this.router.navigate(['loginpage'])
  }
  ngOnInit() {
  }

}
