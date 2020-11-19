import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  processCompleted = false
  showProcessing = false
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  processingButtonClicked(){
    this.router.navigateByUrl('deposit/receipt')
  }
  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 3000)
  }

}
