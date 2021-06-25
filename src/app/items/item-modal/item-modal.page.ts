import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NetworkService } from 'src/app/service/network.service';
import { ToastedService } from 'src/app/service/toasted.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  itemss: any;

  ItemForm: FormGroup;

  constructor(private modalCtrl:ModalController,private toast: ToastedService,private network:NetworkService) { 
    this.ItemForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Price: new FormControl(null, Validators.required),
      Quantity: new FormControl('', Validators.required),
    });
    this.network.getData('items').then(data =>{
      this.itemss = data;
      console.log(this.itemss);
    });
  }

  ngOnInit() { }

  click() {
    this.modalCtrl.dismiss();
  }
  
  Add(){
    var item = {
      product_name: this.name,
      product_price: this.price,
      quantity: this.quantity
    };
    this.network.postData('items',item,'Item added Error','Please try again!').then(data =>{
      console.log(data);
      this.toast.showToast('Item successfully added!');
    });
  }

  Update(){
    for(let i=0;i<this.itemss.length;i++){
      if(this.itemss[i].product_name === this.name){
        console.log(this.itemss[i]);
        console.log(this.itemss[i].product_id);
        var item = {
          product_name: this.name,
          product_price: this.price,
          quantity: this.quantity
        };
        this.network.putData('items',this.itemss[i].product_id,item,'Update Error','You may select invalid item.').then(data =>{
          console.log(data);
          this.toast.showToast('Successfully updated!');
        });
      }
    }
  }

  Delete(){
    for(let i=0;i<this.itemss.length;i++){
      if(this.itemss[i].product_name === this.name){
        console.log(this.itemss[i]);
        console.log(this.itemss[i].product_id);
        this.network.delData('items',this.itemss[i].product_id,'Deleting Error','You may entered invalid item.').then(data =>{
          console.log(data);
          this.toast.showToast('Successfully deleted!');
        });
      }
    }

  }

}
