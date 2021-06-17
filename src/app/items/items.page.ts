import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NetworkService } from '../service/network.service';
import { ItemModalPage } from './item-modal/item-modal.page';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  itemData: any;

  constructor(private modalController: ModalController,private network: NetworkService){
    this.network.getData('items').then(data =>{
      this.itemData = data;
    });
  }

  ngOnInit() { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ItemModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
}
