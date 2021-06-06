import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NetworkService } from 'src/app/service/network.service';
import { ToastedService } from 'src/app/service/toasted.service';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.page.html',
  styleUrls: ['./item-modal.page.scss'],
})
export class ItemModalPage implements OnInit {
  id: number;
  name: string;
  price: number;
  quantity: number;

  constructor(
    public modalCtrl:ModalController,
    public toast: ToastedService,
    public network:NetworkService) { }

  ngOnInit() { }

  click() {
    this.modalCtrl.dismiss();
  }
  
  Add(){
    var item = {
      product_id: this.id,
      product_name: this.name,
      product_price: this.price,
      quantity: this.quantity
    };
    this.network.postData('items',item).then(data =>{
      console.log(data);
    });
    this.toast.showToast('Item successfully added!');
  }

  Update(){
    var item = {
      product_id: this.id,
      product_name: this.name,
      product_price: this.price,
      quantity: this.quantity
    };
    this.network.putData('items',this.id,item).then(data =>{
      console.log(data);
    });
    this.toast.showToast('Successfully updated!');
  }

  Delete(){
    this.network.delData('items',this.id).then(data =>{
      console.log(data);
    });
    this.toast.showToast('Successfully deleted!');
  }

}
