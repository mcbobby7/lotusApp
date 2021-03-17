import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalalertservicesService {
  loading: any = "";
  public globalLoading = new Subject<any>();
  constructor(
    public loadingController: LoadingController,
    private alertController: AlertController,
    private toastCtrl: ToastController) { }
 
 async gPresentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
      translucent: true,
      spinner: "bubbles",
    });
 
   this.globalLoading.subscribe(resp => {
     console.log(resp)
     if (resp) {
       this.loading.dismiss();
     }
   });
 await this.loading.present();
 }
  
  gdismissLoading() {
  setTimeout(() => {
    this.globalLoading.next('close');
  }, 2000);
  }
  
 async gPresentToast(message, alertType) {
    const toast = await this.toastCtrl.create({
      duration: 5000,
      message: message,
      color: alertType
    });
    toast.present();
}
  
}
