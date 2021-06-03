import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customertype',
  templateUrl: './customertype.component.html',
  styleUrls: ['./customertype.component.scss'],
})
export class CustomertypeComponent implements OnInit {
  @Input() subject: Subject<any>
  constructor() { }
  selectdeposittype(depType){
    this.subject.next(depType);
    this.subject.complete()
  }

  ngOnInit() {}

}
