import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DepositService } from '../_services/deposit.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
  @Output() buttonClick = new EventEmitter()
  
  @Input() processCompleted = false
  @Input() successButtonText = 'Print Receipt'
  @Input() okButtonText = 'Ok'
  constructor(private router: Router,
    private depositService: DepositService,) { }
  goBack(){
    this.depositService.store({})
this.router.navigate(['dashbord'])
  }
  ngOnInit() {}

}
