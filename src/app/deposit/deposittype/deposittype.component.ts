import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-deposittype',
  templateUrl: './deposittype.component.html',
  styleUrls: ['./deposittype.component.scss'],
})
export class DeposittypeComponent implements OnInit {
  @Input() subject: Subject<any>
  constructor() { }
  selectdeposittype(depType){
    this.subject.next(depType);
    this.subject.complete()
  }
  ngOnInit() {}

}
