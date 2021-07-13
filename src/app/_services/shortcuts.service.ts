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
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  constructor(
    private toastCtrl: ToastController
  ) { }
//format DAte 01 APR 2021
  formatDAte(date: Date): string{
    console.log(date)
    var newDate = "";
    var dateday = date.getDay();
    var datemnth = this.months[date.getMonth()];
    var dateYr = date.getFullYear();
    newDate = dateday + " " + datemnth + " " + dateYr;
    return newDate;
}
  async showToast(message, cssClass){
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: cssClass
    })
    toast.present()

  }

  showErrorToast(message){
    this.showToast(message, 'danger')
  }
}
