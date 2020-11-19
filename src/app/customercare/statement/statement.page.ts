import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonDatetime, NavController } from '@ionic/angular';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {
  @ViewChild('datetime') gg: IonDatetime

  showProcessing = false
  processCompleted = false
  constructor(
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  showDate(){
    this.gg.open()
  }
  
  goback(){
    this.navCtrl.back();
  }

  submit(){
    this.showProcessing = true
    window.setTimeout(()=>{this.processCompleted = true}, 3000)
  }

  processingButtonClicked(){
    this.router.navigateByUrl('/tabs/tab1')
  }


}
