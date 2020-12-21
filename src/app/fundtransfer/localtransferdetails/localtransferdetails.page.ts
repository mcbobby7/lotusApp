import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankAccount, BankService } from 'src/app/_services/bank.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-localtransferdetails',
  templateUrl: './localtransferdetails.page.html',
  styleUrls: ['./localtransferdetails.page.scss'],
})
export class LocaltransferdetailsPage implements OnInit {
  transfer: FundTransfer = {};
  acctBal: number = 20000;
  amount?: number;
  bankAccount?: string = '';
  tobankAccount?: string = ''
  bankType: string;
  loadingBankAccount = false;
  transferType: string = '';
  allacct = [];
  trfAmount: any
  constructor( 
    private inpVali: InputvalidationService,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
    private transferService: TransferService) { }
    avalidate(event,fieldelement){
      var inputentry =  event.target.value;
   var valRes =  this.inpVali.validate(event,fieldelement);
   if(valRes && fieldelement == "amount" ){
    var amt = inputentry.replace(/,/g, "");
    this.trfAmount = amt;
    var newamt = amt.replace('.', "");
    this.transfer.amount = this.inpVali.getCurrency(newamt);
   }
    }
    submit(){
      if(!this.transfer.amount || this.transfer.amount == "0.00"){
        this.shortcuts.showErrorToast('Please Supply Amount')
      }else
     { 
      var amt = this.transfer.amount.replace(/,/g, "");
       if(Number(amt) > this.transfer.balance){
        this.shortcuts.showErrorToast('Insufficient fund')
       }else{
        this.loadingBankAccount = true
      
        this.transferService.store(this.transfer).then(() => {
         this.loadingBankAccount = false;
          this.router.navigateByUrl('/fundtransfer/confirm')
        })
       }
      
      }
    }
    goBack(){
      this.navCtrl.back()
    }
    ionViewWillEnter(){
      this.transferService.get().subscribe(data => {
        this.transfer = data
      })
    }
  ngOnInit() {
  
  }

}
