import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.scss'],
})
export class AccountInputComponent implements OnInit {

  invalid = false
  constructor(
    private shortcut: ShortcutsService
  ) { }

  innerValue: number

  @Input() set value(val: number){
    this.innerValue = val
  }

  @Output() valueChange = new EventEmitter<number>()
  @Output() validityChanged = new EventEmitter<boolean>()

  ngOnInit() {}

  async validate(event){
    var inputentry =  event.target.value;

    var reg = new RegExp('^[-,-.0-9]+$');
    //console.log(reg.test(inputentry));
    if(inputentry && reg.test(inputentry) ){
      this.invalid = false;
        if(inputentry.length == 10){
          this.valueChange.emit(inputentry)
          this.invalid = false;
        }
        if(inputentry.length > 10){
          this.invalid = true;
          this.shortcut.showErrorToast("Account number can't be more than 10 digits")
        }else{
        }
    }else{
      if(event.key == "Backspace" || event.key == "Delete" || event.key == "ArrowLeft" || event.key == "ArrowRight"){

      }else{
        this.shortcut.showErrorToast("Please input number")        
        event.target.value = inputentry.slice(0,-1);
        return false;

      }
     
    }

    this.validityChanged.next(!this.invalid)
}

}
