import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


const TOAST_CSS_CLASSES = {
  error: 'danger',
  success: 'success'
}
@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async showToast(message, cssClass){
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      cssClass: cssClass
    })
    toast.present()

  }

  showErrorToast(message){
    this.showToast(message, 'danger')
  }
}
