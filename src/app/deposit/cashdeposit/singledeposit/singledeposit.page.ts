import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-singledeposit',
  templateUrl: './singledeposit.page.html',
  styleUrls: ['./singledeposit.page.scss'],
})
export class SingledepositPage implements OnInit {
  depositObj: Deposit = {}

  depositorForm = new FormGroup({
    depositorFullname: new FormControl(''),
    depositorPhoneNumber: new FormControl(''),
    depositorEmail: new FormControl(''),
    narration: new FormControl(''),
  });


  constructor(
    private activatedroute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private depositService: DepositService,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService
  ) { }

  validate(){
    
  }

  submit(){
    // console.log(this.depositObj)
    this.depositService.store(this.depositObj)
    this.router.navigateByUrl('/deposit/confirm', {queryParams: JSON.parse})
  }
  ionViewWillEnter(){
    this.depositService.get().subscribe((data: any) => {
      this.depositObj = {...data}
    })
  }
  ngOnInit() {
   
  }
  getdepositdetails() {
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data)
      if (data.depositDetails) {
        this.depositObj = JSON.parse(data.depositDetails);
        console.log(this.depositObj)
        console.log(JSON.parse(data.depositDetails))
      }
    })
  }
  avalidate(event,fieldelement){
    var inputentry =  event.target.value;
 var valRes =  this.inpVali.validate(event,fieldelement);
 if(valRes && fieldelement == "amount" ){
  var amt = inputentry.replace(/,/g, "");
  var newamt = amt.replace('.', "");
  this.depositObj.amount = this.inpVali.getCurrency(newamt);
 }
  }

  validateSingleDep(){
    console.log(this.depositObj)
    if(this.depositObj.amount && this.depositObj.amount != '0.00'){
if(this.depositObj.selfdeposit){
  this.depositObj.proceedChk = true;
  this.depositService.store(this.depositObj).then(data => {
    this.router.navigate(['/deposit/depositor-detail'])
  })
}else{
  this.shortcutService.showErrorToast('Please select depositor')
}
    }else{
      this.shortcutService.showErrorToast('Please input Amount')
    }
  }

proceedtoSummary(){
  
}
  goBack() {
    this.navCtrl.back()
  }


}
