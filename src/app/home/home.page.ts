import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { DepositService } from '../_services/deposit.service';
import { WithdrawalService } from '../_services/withdrawal.service';
import { environment } from '../../environments/environment';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mode = "development"
  imei
  imeiTrue = false

  constructor(private router: Router, private navCtrl: NavController, private printer: Printer,
    private AuthenService: AuthenticationService,private depositService: DepositService,private withdrawalService: WithdrawalService) { }
  ionViewWillEnter() {
    this.AuthenService.clearusers();
    this.depositService.store({});
    this.withdrawalService.store({});
  }

  gotostart(){
 this.router.navigate(['dashbord'])
  }
  ngOnInit() {
    if(environment.production == true) {
      this.mode = "production"
      console.log("true");
      
    }else {
      this.mode == "development"
      console.log("false");
      
    }
    if(localStorage.getItem('imei')) {
      this.imei =localStorage.getItem('imei')
    } else {
      this.imei = null
    }
  }

  printStuff() {
    let  options: PrintOptions = {
      name: 'MyDocument',
      duplex: true,
      orientation: 'landscape',
      monochrome: true
  }

  this.printer.isAvailable().then(data => {

      const div = `<ion-card-content>
      <div>
        <div>Lotus receipt</div>
      </div>
      <table style="width: 100%; margin-top: 20px;">
        <tr>
          <td style="font-size: 14px; padding-bottom: 10px;"> <b>Name</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">{{withdrawal.accountName}}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-bottom: 10px;"><b>Account No.</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">{{withdrawal.accountNo}}</td>
        </tr>
        <tr *ngIf="withdrawal.chequeNo">
          <td style="font-size: 14px; padding-bottom: 10px;"><b>Cheque No.</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">{{withdrawal.chequeNo}}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-bottom: 10px;"><b>Amount</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">&#8358; {{withdrawal.amount | number: '.2'}}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-bottom: 10px;"><b>Narration</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">{{withdrawal.narration}}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-bottom: 10px;"><b>Date</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">{{date | date:'mediumDate'}}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-bottom: 10px;"><b>Time</b></td>
        </tr>
        <tr>
          <td style="font-size: 14px; padding-left: 0px; padding-bottom: 10px;">{{date | date:'shortTime'}}</td>
        </tr>
      </table>
    </ion-card-content>`    
      this.printer.print(div, options).then(data => {
        alert("printing done successfully !");
        console.log("printing done successfully !");
      },  err => {
        const myJSON = JSON.stringify(err);
        alert("Error while printing !");
        console.log(myJSON);
      });
  },  err => {

    alert("No Printer avalaible!");
    console.log("No Printer avalaible!");

  });
   } 

   onChange() {
    localStorage.setItem('imei', this.imei);
    console.log(localStorage.getItem('imei'));
  }
  setIMEI() {
    this.imeiTrue = !this.imeiTrue
  }


}
