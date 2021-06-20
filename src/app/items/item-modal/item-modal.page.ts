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

  ItemForm: FormGroup;

  constructor(private modalCtrl:ModalController,private toast: ToastedService,private network:NetworkService) { 
    this.ItemForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Price: new FormControl(null, Validators.required),
      Quantity: new FormControl('', Validators.required),
    });
  }

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
      this.toast.showToast('Item successfully added!');
    });
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
      this.toast.showToast('Successfully updated!');
    }).catch(err =>{
      this.toast.alertMessage("Update Error","Id and Item should be provide.");
    });
    
  }

  Delete(){
    this.network.delData('items',this.id).then(data =>{
      console.log(data);
      this.toast.showToast('Successfully deleted!');
    }).catch(err =>{
      this.toast.alertMessage("Delete Error","Id should be provide.");
    });
  }

}
