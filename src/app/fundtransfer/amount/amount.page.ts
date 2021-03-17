import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiProvider } from 'src/app/_services/api.service';
import { BankAccount, BankService } from 'src/app/_services/bank.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {
  acctBal: number = 20000;
  amount?: number;
  bankAccount?: string = '';
  tobankAccount?: string = ''
  bankType: string;
  transfer: FundTransfer = {}
  loadingBankAccount = false;
  transferType: string = '';
  allacct = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private bankService: BankService,
    private transferService: TransferService,
    private shortcuts: ShortcutsService,
    private inpVali: InputvalidationService,
    private apiService: ApiProvider
  ) { }

  get disableSubmit(){
    return !(Number(this.amount) > 0)?true:(this.amount > this.acctBal?true:false)
  }
  ionViewWillEnter(){
    this.transferService.get().subscribe((data) => {
      this.transfer = data;
      this.apiService.getAllAccountDetails(this.transfer.accountNo).subscribe((data:any) => {
        if (!data.error) {
          this.allacct = data.body;
          } else {
          this.loadingBankAccount = false
          this.shortcuts.showErrorToast('Invalid account number')
        }
  
        
},() => {
  this.loadingBankAccount = false
  this.shortcuts.showErrorToast('Invalid account number')
})

    })
// this.allacct = this.bankService.getallaccount()
//     console.log(this.bankService.getallaccount())
this.activatedroute.queryParams.subscribe(data=>{

  if(data.trftype){
if(data.trftype == 'own'){this.transferType = "Own Account Transfer"}
if(data.trftype == 'lotus'){this.transferType = "Lotus Bank"}  
if(data.trftype == 'other'){this.transferType = "Other Banks"}  
if(data.trftype == 'FX'){this.transferType = "Funds Transfer"}  
}
})
    this.transferService.get().subscribe((data: any) => {
      this.transfer = data
      this.acctBal = this.transfer.balance
    })
  }
  ngOnInit() {}
  submit(){
    if(this.transferType == "Own Account Transfer" ||  this.transferType == "Lotus Bank"){
      if(!this.bankAccount || !this.tobankAccount){
        this.shortcuts.showErrorToast('Please Supply Credit and Debit Account')
        return false;
      }else{
        this.loadingBankAccount = true
        this.apiService.getAllAccountDetails(this.bankAccount).subscribe((data:any) => {
          if (!data.error) {
            this.loadingBankAccount = false
            let acctDet = data.body[0];


            this.transfer.accountNo = this.bankAccount;
            this.transfer.accountName = acctDet.accountName;
             this.transfer.transferType = this.transferType;
          this.transfer.balance = acctDet.accountBalance
            this.apiService.getAllAccountDetails(this.tobankAccount).subscribe((data:any) => {
              if (!data.error) {
                this.loadingBankAccount = false
                let acctDet = data.body[0];
                this.transfer.toAccountNo = this.tobankAccount;
                this.transfer.toAccountName = acctDet.accountName;
                this.transferService.store(this.transfer).then(() => {
                  this.router.navigateByUrl('localtransferdetails')
                })
              
              } else {
                this.loadingBankAccount = false
                this.shortcuts.showErrorToast('Invalid Credit account number')
              }
        
              
      },() => {
        this.loadingBankAccount = false
        this.shortcuts.showErrorToast('Invalid Credit account number')
      })
         
          } else {
            this.loadingBankAccount = false
            this.shortcuts.showErrorToast('Invalid Debit account number')
          }
    
          
  },() => {
    this.loadingBankAccount = false
    this.shortcuts.showErrorToast('Invalid Debit account number')
  })

        // this.bankService.getBankByAccountNumber(this.bankAccount).subscribe((bank: BankAccount) => {
      
        //   this.transfer.accountNo = this.bankAccount;
        //  this.transfer.accountName = bank.name;
        //   this.transfer.transferType = this.transferType;
        //   this.bankService.getBankByAccountNumber(this.tobankAccount).subscribe((tobank: BankAccount) => {
        //     this.transfer.toAccountNo = this.tobankAccount;
        //     this.transfer.toAccountName = tobank.name
        //     this.loadingBankAccount = false;
        //     this.transferService.store(this.transfer).then(() => {
        //       this.router.navigateByUrl('localtransferdetails')
        //     })
        //   }, () => {
        //     this.loadingBankAccount = false
        //     this.shortcuts.showErrorToast('Error fetching Debit account details')
        //   })
        // }, () => {
        //   this.loadingBankAccount = false
        //   this.shortcuts.showErrorToast('Error fetching Credit account details')
        // })
      }
    }else{
      if(!this.bankAccount){
        this.shortcuts.showErrorToast('Please Supply Debit Account')
        return false;
      }else{
        this.loadingBankAccount = true        
        this.apiService.getAllAccountDetails(this.bankAccount).subscribe((data:any) => {
          if (!data.error) {
            this.loadingBankAccount = false
            let acctDet = data.body[0];

            this.transfer.accountNo = this.bankAccount;
            this.transfer.accountName = acctDet.accountName;
            this.transfer.transferType = this.transferType;
            this.transfer.balance = acctDet.accountBalance
             this.loadingBankAccount = false;
             this.transferService.store(this.transfer).then(() => {
               if(this.transferType == "Funds Transfer"){
                 this.router.navigate(['/fundtransfer/foreigntransfer'])
               }else{
                 this.router.navigateByUrl('/fundtransfer/intltrfdetails')
               }
               
             })
             return true;
         
          } else {
            this.loadingBankAccount = false
            this.shortcuts.showErrorToast('Invalid Debit account number')
          }
    
          
  },() => {
    this.loadingBankAccount = false
    this.shortcuts.showErrorToast('Invalid Debit account number')
  })
        // this.bankService.getBankByAccountNumber(this.bankAccount).subscribe((bank: BankAccount) => {
      
        //   this.transfer.accountNo = this.bankAccount;
        //  this.transfer.accountName = bank.name;
        //   this.transfer.transferType = this.transferType;
        //   this.loadingBankAccount = false;
        //   this.transferService.store(this.transfer).then(() => {
        //     if(this.transferType == "Funds Transfer"){
        //       this.router.navigate(['/fundtransfer/foreigntransfer'])
        //     }else{
        //       this.router.navigateByUrl('/fundtransfer/intltrfdetails')
        //     }
            
        //   })
        //   return true;
        // });
      }
    }

  }

  goBack(){
    this.navCtrl.back()
  }

}
