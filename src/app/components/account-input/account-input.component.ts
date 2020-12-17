import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AccountInputComponent),
      multi: true,
    },
  ],
})
export class AccountInputComponent implements OnInit, ControlValueAccessor, Validator {

  invalid = true
  constructor(
    private shortcut: ShortcutsService
  ) { }

  innerValue: number

  @Input() set value(val: number) {
    this.innerValue = val
  }

  // @Input() set model(val: number) {
  //   this.innerValue = val
  // }

  @Output() valueChange = new EventEmitter<number>()
  // @Output() modelChange = new EventEmitter<number>()
  @Output() validityChanged = new EventEmitter<boolean>()

  ngOnInit() { }

  valueChanged(event) {
    var inputentry = event.target.value;

    var reg = new RegExp('^[-,-.0-9]+$');
    //console.log(reg.test(inputentry));
    if (inputentry && reg.test(inputentry)) {
      this.invalid = false;
      if (inputentry.length == 10) {
        this.invalid = false;
        this.valueChange.emit(inputentry)
        this.onChanged(inputentry);
        this.onValidationChange();
      }
      else if (inputentry.length > 10) {
        this.invalid = true;
        this.shortcut.showErrorToast("Account number can't be more than 10 digits")
      } else {
        this.invalid = true;
      }
    } else {
      if (event.key == "Backspace" || event.key == "Delete" || event.key == "ArrowLeft" || event.key == "ArrowRight") {

      } else {
        this.shortcut.showErrorToast("Please input number")
        event.target.value = inputentry.slice(0, -1);
        return false;

      }
    }

    this.onValidationChange();
    this.validityChanged.next(!this.invalid)
  }

  _value = ''
  onChanged = (change) => {};
  onTouched = () => {};
  onValidationChange = ()=>{};

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  validate(control: AbstractControl){
    return this.invalid ? {invalid: true} : null
  }
}
