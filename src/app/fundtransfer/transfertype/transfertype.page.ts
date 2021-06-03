import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';

@Component({
  selector: 'app-transfertype',
  templateUrl: './transfertype.page.html',
  styleUrls: ['./transfertype.page.scss'],
})
export class TransfertypePage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController, private GalertService: GlobalalertservicesService) { }
  gotolocaltrf(){
    this.router.navigate(['localtransfertype'])
  }
  gotoIntl(trftype){
    this.router.navigate(['fundtransfer/amount'],{queryParams:{trftype: trftype}})
    
  }
  ngOnInit() {
    this.GalertService.gdismissLoading();
  }
  ionViewWillEnter() {
    this.GalertService.gdismissLoading();
  }
  goBack(){
    this.navCtrl.back()
  }
}
