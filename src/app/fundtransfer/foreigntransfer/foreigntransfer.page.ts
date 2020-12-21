import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BankService } from 'src/app/_services/bank.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-foreigntransfer',
  templateUrl: './foreigntransfer.page.html',
  styleUrls: ['./foreigntransfer.page.scss'],
})
export class ForeigntransferPage implements OnInit {

  processCompleted = false
  transfer: FundTransfer = {}
  showProcessing = false;
  loadingBankAccount = false;
  constructor(private transferService: TransferService,
    private inpVali: InputvalidationService,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private shortcuts: ShortcutsService,
   ) { }
  submit(){
    this.loadingBankAccount = true;
    if(!this.transfer.tobank || !this.transfer.toAccountNo || !this.transfer.swiftCode || !this.transfer.routingNumber){
      this.shortcuts.showErrorToast('Please Fill all the Fields')
    }else
   { 
    this.transferService.store(this.transfer).then(() => {
      this.loadingBankAccount = false;
       this.router.navigateByUrl('/fundtransfer/foreigntransfer-correspondent')
     })
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
