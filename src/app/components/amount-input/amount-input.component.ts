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

  @Output() valueChange = new EventEmitter<any>()
  constructor(
    private shortcuts: ShortcutsService,
    private currencyPipe: DecimalPipe,
    private inputValidation: InputvalidationService
  ) { }
  ionViewWillEnter(){
    this.inputValidation.amountChanged.subscribe(amount => {
      this.valueChange.emit(amount)
    })
  }
  ngOnInit() {
 
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
    var inputentry =  event.target.value;
    var valRes = this.inputValidation.validate(event, 'amount')
    if(valRes){
      var amt = inputentry.replace(/,/g, "");
      var newamt = amt.replace('.', "");
      this.innerValue = this.inputValidation.getCurrency(newamt);
      this.valueChange.emit(Number(newamt) / 100)
     }
  }

}
