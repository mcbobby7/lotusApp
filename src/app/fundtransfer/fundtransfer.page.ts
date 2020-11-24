import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.page.html',
  styleUrls: ['./fundtransfer.page.scss'],
})
export class FundtransferPage implements OnInit {
  accountNo = ""
  constructor( private router: Router,
    private navCtrl: NavController) { }
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }
  
  submit(){
    this.router.navigateByUrl('/fundtransfer/amount')
  }

  goBack(){
    this.navCtrl.back()
  }
  ngOnInit() {
  }

}
