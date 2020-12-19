import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-withdrawaltype',
  templateUrl: './withdrawaltype.component.html',
  styleUrls: ['./withdrawaltype.component.scss'],
})
export class WithdrawaltypeComponent implements OnInit {
  @Input() subject: Subject<any>
  constructor() { }
  selectdeposittype(depType){
    this.subject.next(depType);
    this.subject.complete()
  }

  ngOnInit() {}

}
