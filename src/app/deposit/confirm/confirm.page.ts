import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  showProcessing = false
  processCompleted = false
  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 3000)
  }

  processingButtonClicked(){
    this.showProcessing = false
    // this.router.navigateByUrl('/deposit/receipt')
    this.router.navigateByUrl('/')
  }

  goBack(){
    this.navCtrl.back()
  }

  processingClicked(){
    
  }

}
