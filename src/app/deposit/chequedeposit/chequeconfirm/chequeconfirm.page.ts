import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService, multiChqDeposit } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-chequeconfirm',
  templateUrl: './chequeconfirm.page.html',
  styleUrls: ['./chequeconfirm.page.scss'],
})
export class ChequeconfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  depositObj: multiChqDeposit = {}
  kchqTotal: any='';
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private depositService: DepositService
  ) { }

  ngOnInit() {
    this.depositService.get().subscribe(data => {
      this.depositObj = data
      this.getchqTotal();
    })


  }

  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 5000)
  }

  processingButtonClicked(){
    this.showProcessing = false
    this.router.navigateByUrl('/deposit/receipt')
    // this.router.navigateByUrl('/')
  }

  goBack(){
    this.navCtrl.back()
  }
getchqTotal(){
  var dTotal = 0;
  const chqTotal = this.depositObj.accountInfo.map(dep=>{
    var amt = parseFloat(dep.amount.replace(/,/g, ""));
    dTotal += amt;
  });
 this.kchqTotal = dTotal;
 //console.log(this.kchqTotal)
}
  processingClicked(){
    
  }


}
