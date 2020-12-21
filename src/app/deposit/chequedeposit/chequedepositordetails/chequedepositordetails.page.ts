import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-chequedepositordetails',
  templateUrl: './chequedepositordetails.page.html',
  styleUrls: ['./chequedepositordetails.page.scss'],
})
export class ChequedepositordetailsPage implements OnInit {
  depositObj: any = {}

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
    if(this.depositObj.selfdeposit == 'otheraccount'){
      if(!this.depositObj.depositorFullname || !this.depositObj.depositorPhoneNumber){
        this.shortcutService.showErrorToast('Please fill Fullname and Phone Number field')
      }else{
        this.depositService.store(this.depositObj)
        this.router.navigateByUrl('/chequeconfirm', {queryParams: JSON.parse})
      }
    }else{
      this.depositService.store(this.depositObj)
      this.router.navigateByUrl('/chequeconfirm', {queryParams: JSON.parse})
    }
    
  }
  ionViewWillEnter(){
    this.depositService.get().subscribe((data: any) => {
      this.depositObj = {...data}
    })
  }
  ngOnInit() {
 
  }

  goBack() {
    this.navCtrl.back()
  }

}
