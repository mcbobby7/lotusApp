import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-otpfingerprintoption',
  templateUrl: './otpfingerprintoption.component.html',
  styleUrls: ['./otpfingerprintoption.component.scss'],
})
export class OtpfingerprintoptionComponent implements OnInit {
  @Input() subject: Subject<any>
  constructor() { }
  selectdeposittype(depType){
    this.subject.next(depType);
    this.subject.complete()
  }
  ngOnInit() {

  }

}
