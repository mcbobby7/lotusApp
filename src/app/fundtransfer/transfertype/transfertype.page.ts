import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transfertype',
  templateUrl: './transfertype.page.html',
  styleUrls: ['./transfertype.page.scss'],
})
export class TransfertypePage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }
  gotolocaltrf(){
    this.router.navigate(['localtransfertype'])
  }
  gotoIntl(trftype){
    this.router.navigate(['fundtransfer/amount'],{queryParams:{trftype: trftype}})
    
  }
  ngOnInit() {
  }
  goBack(){
    this.navCtrl.back()
  }
}
