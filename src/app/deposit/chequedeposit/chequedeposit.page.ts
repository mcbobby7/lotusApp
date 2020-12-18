import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService, multiChqDeposit, multiDeposit } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chequedeposit',
  templateUrl: './chequedeposit.page.html',
  styleUrls: ['./chequedeposit.page.scss'],
})
export class ChequedepositPage implements OnInit {
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: multiChqDeposit = {accountInfo:[{issuingBank:'',chqNumber:'',amount:'',erroramount: false}],};
  constructor(private navCtrl: NavController,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService,
    private router: Router,) { }
  goBack(){
    this.navCtrl.back()
      }

      validateForm() {
        if (this.depositObj.accountNumber) {
          return true
        }
        return false
      }
 
      submitRequest(depositDetails) {
        if (this.validateForm()) {
          this.loadingBankAccount = true
          const subject = this.bankService.getBankByAccountNumber(this.depositObj.accountNumber)
          subject.subscribe((bank: BankAccount) => {
            this.loadingBankAccount = false
            console.log(bank)
            this.depositObj.accountName = bank.name;
            this.depositService.store(this.depositObj).then(data => {
              this.router.navigate(['/chequedepositinput'], { queryParams: { depositDetails: JSON.stringify(depositDetails) } })
            })
          }, () => {
            this.loadingBankAccount = false
            this.shortcutService.showErrorToast('Invalid account number')
          })
        } else {
          this.shortcutService.showErrorToast('Please fill all required fields')
        }
      }
  ngOnInit() {
  }

}
