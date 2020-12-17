import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BankService, BankAccount } from '../_services/bank.service';
import { Deposit, DepositService } from '../_services/deposit.service';
import { InputvalidationService } from '../_services/inputvalidation.service';
import { ShortcutsService } from '../_services/shortcuts.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  loadingBankAccount = false
  depositForm: FormGroup;
  intrusmntType: any = '';
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  depositObj: Deposit = {}

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService
  ) { }
  ionViewWillEnter() {
    this.getinstrumentType()
  }
  async getinstrumentType() {
    const alert = await this.alertCtrl.create({
      cssClass: 'myalertradiocustom-class',
      header: 'Instrument Type ',
      message: 'Please select Instrument Type',
      inputs: [
        {
          name: 'instType',
          type: 'radio',
          label: 'Cash',
          value: 'cash',
        },
        {
          name: 'instType',
          type: 'radio',
          label: 'Cheque',
          value: 'Cheque',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertCtrlbtncancel',
          handler: () => {
            console.log('Confirm Cancel');
            this.router.navigate(['/']);
          }
        }, {
          text: 'Select',
          cssClass: 'alertCtrlbtnpry',
          handler: async (instrumentType) => {
            if (instrumentType) {
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: instrumentType + ' selected',
                color: "success"
              });
              toast.present();
              this.intrusmntType = instrumentType;
            } else {
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: 'Please select Instrument Type',
                color: "danger"
              });
              toast.present();
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  validateForm() {
    if (this.depositObj.accountNumber && this.depositObj.amount) {
      return true
    }
    return false
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

  submitRequest(depositDetails) {
    if (this.validateForm()) {
      this.loadingBankAccount = true
      const subject = this.bankService.getBankByAccountNumber(this.depositObj.accountNumber)
      subject.subscribe((bank: BankAccount) => {
        this.loadingBankAccount = false
        console.log(bank)
        this.depositObj.bankName = bank.name
        this.depositService.store(this.depositObj).then(data => {
          this.router.navigate(['/deposit/depositor-detail'], { queryParams: { depositDetails: JSON.stringify(depositDetails) } })
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

  goBack() {
    this.navCtrl.back()
  }

}
