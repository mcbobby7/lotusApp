import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-capturebiometric',
  templateUrl: './capturebiometric.page.html',
  styleUrls: ['./capturebiometric.page.scss'],
})
export class CapturebiometricPage implements OnInit {
startSpinner: boolean = false;
processCompleted: boolean = false;
nextRoute: any = '';
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private navCtrl: NavController
  ) { }
  ionViewWillEnter(){
    this.activatedroute.queryParams.subscribe(data=>{
      if(data.nxtRoute){
        this.nextRoute = data.nxtRoute;
      }
    })
 setTimeout(() => {
   this.startSpinner = true;
   this.verifiedcompleted();
 }, 3000);
      }  
      verifiedcompleted(){
        setTimeout(() => {
          this.startSpinner = false;
          this.processCompleted = true;
          this.gotonextpage();
        }, 3000);
      }

      gotonextpage(){
       setTimeout(() => {
         this.router.navigate([this.nextRoute])
       }, 1000);
      }
  goBack(){
    this.navCtrl.back()
  }
  ngOnInit() {
  }

}
