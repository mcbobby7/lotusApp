import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  NavController } from '@ionic/angular';
import {  BankService, } from 'src/app/_services/bank.service';
import {  DepositService } from 'src/app/_services/deposit.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-selfservice',
  templateUrl: './selfservice.page.html',
  styleUrls: ['./selfservice.page.scss'],
})
export class SelfservicePage implements OnInit {

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
