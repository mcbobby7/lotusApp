import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(private navCtrl: NavController,
    private loadingCtrl: LoadingController,private routes: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.routes.navigate(['/dashbord'])
  }
}
