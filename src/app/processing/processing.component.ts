import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
  @Output() buttonClick = new EventEmitter()
  @Input() processCompleted = false
  @Input() successButtonText = 'Generate Receipt'
  constructor() { }

  ngOnInit() {}

}
