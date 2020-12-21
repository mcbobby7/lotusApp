import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-localtransfertype',
  templateUrl: './localtransfertype.page.html',
  styleUrls: ['./localtransfertype.page.scss'],
})
export class LocaltransfertypePage implements OnInit {

  constructor(private router: Router, private navCtrl : NavController) { }
  gotolocaltrf(trftype){
this.router.navigate(['fundtransfer/amount'],{queryParams:{trftype: trftype}})
  }
  goBack(){
    this.navCtrl.back()
  }
  ngOnInit() {
  }

}
