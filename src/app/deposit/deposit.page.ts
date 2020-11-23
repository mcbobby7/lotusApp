import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
intrusmntType: any = '';
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router : Router
  ) { }
  ionViewWillEnter(){
this.getinstrumentType()
  }
  async getinstrumentType(){
    const alert = await this.alertCtrl.create({
      cssClass: 'myalertradiocustom-class',
      header: 'Instrument Type ',
      message: 'Please select Instrument Type',
      inputs: [
        {
          name: 'instType',
          type: 'radio',
          label: 'Cash',
          value: 'cash',  
        },
        {
          name: 'instType',
          type: 'radio',
          label: 'Cheque',
          value: 'Cheque',  
        }
      ],    
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertCtrlbtncancel',
          handler: () => {
            console.log('Confirm Cancel');
            this.router.navigate(['/']);
          }
        }, {
          text: 'Select',
          cssClass: 'alertCtrlbtnpry',
          handler: async (instrumentType) => {         
            if(instrumentType){
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: instrumentType + ' selected',
                color: "success"
              });
              toast.present();
this.intrusmntType = instrumentType;
            }else{
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: 'Please select Instrument Type',
                color: "danger"
              });
              toast.present();
              return false;
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back()
  }

}
