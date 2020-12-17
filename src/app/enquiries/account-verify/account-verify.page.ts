import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BankAccount, BankService, } from 'src/app/_services/bank.service';
import { Deposit, DepositService,multiDeposit,accountDetails } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.page.html',
  styleUrls: ['./account-verify.page.scss'],
})
export class AccountVerifyPage implements OnInit {

  constructor(private navCtrl: NavController,
    private router: Router,
    private inpVali: InputvalidationService,
    private shortcutService: ShortcutsService,
    private depositService: DepositService,
    private bankService: BankService) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
