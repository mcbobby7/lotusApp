import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-depositor-detail',
  templateUrl: './depositor-detail.page.html',
  styleUrls: ['./depositor-detail.page.scss'],
})
export class DepositorDetailPage implements OnInit {
  depositObj:{
    accountNumber?: string,
    bankName?: string,
    chqNumber?: string,
    amount?: string,
    depositorFullname?: string,
    depositorPhoneNumber?: string,
    depositorEmail?: string,
    narration?: string
  }={}
 
  constructor(
    private activatedroute: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
getdepositdetails(){
  this.activatedroute.queryParams.subscribe(data=>{
    if(data.depositDetails){
this.depositObj = JSON.parse(data.depositDetails);
    }
  })
}
  goBack(){
    this.navCtrl.back()
  }

}
