import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime, NavController } from '@ionic/angular';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {
  @ViewChild('datetime') gg: IonDatetime

  constructor(
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  showDate(){
    this.gg.open()
  }
  
  goback(){
    this.navCtrl.back();
  }


}
