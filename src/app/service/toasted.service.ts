import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastedService {
  isLoading: boolean = false;

  constructor(public toastController: ToastController,public alrtCtrl: AlertController,public loadCtrl: LoadingController) { }

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

  async loadControlShow(time){
    this.isLoading = true;
    return await this.loadCtrl.getTop().then(hasload =>{
      if(!hasload){
        this.loadCtrl.create({
          spinner: 'crescent',
          message: 'please wait...',
          translucent: true,
          duration: time
        }).then(loading => loading.present());
      }
    });
  }

  async loadControlDismiss(){
    this.isLoading = false;
    return await this.loadCtrl.dismiss().then(() => console.log('dismissed'));
  }

}
