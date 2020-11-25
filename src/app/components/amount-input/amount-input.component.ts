import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
})
export class AmountInputComponent implements OnInit {
  innerValue: string
  invalid = false
  @Input() set value(val){
    // this.innerValue = val
  }

  @Output() valueChange = new EventEmitter<number>()
  constructor(
    private shortcuts: ShortcutsService,
    private currencyPipe: DecimalPipe,
    private inputValidation: InputvalidationService
  ) { }

  ngOnInit() {
    this.inputValidation.amountChanged.subscribe(amount => {
      this.valueChange.emit(amount)
    })
  }

  getCurrency(amount: string) {
    const amountInString = amount.toString().replace('.', '').replace(/,/g, "");
    console.log(amountInString)
    const amt = Number(amountInString)
    var divamnt = (amt/100)
    console.log(amount, amt, divamnt)
    this.valueChange.next(divamnt)
    return this.currencyPipe.transform(divamnt,'.2');
  }

  async avalidate(event) {
    this.inputValidation.validate(event, 'amount')
  }

}
