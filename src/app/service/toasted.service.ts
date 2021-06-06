import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastedService {

  constructor(public toastController: ToastController,public alrtCtrl: AlertController,) { }

  async showToast(messages) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 3000
    });
    toast.present();
  }

  async alertMessage(header,message) {
    const err = await this.alrtCtrl.create({
      cssClass: '.my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await err.present();
  }

}
