import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInputComponent } from './account-input/account-input.component';
import {AmountInputComponent } from './amount-input/amount-input.component';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { ProcessingComponent } from 'src/app/processing/processing.component';
import { DepositService } from '../_services/deposit.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AccountInputComponent,AmountInputComponent,ProcessingComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule 
  ],
  exports: [AccountInputComponent, AmountInputComponent,ProcessingComponent],
  providers: [
    DecimalPipe,
    CurrencyPipe,
    InputvalidationService,
    ShortcutsService,
    DepositService
  ]
})
export class ComponentsModule { }
