import { Component, OnInit } from '@angular/core';
import { ToastedService } from '../service/toasted.service';
import { NetworkService } from '../service/network.service';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-select-items',
  templateUrl: './select-items.page.html',
  styleUrls: ['./select-items.page.scss'],
})
export class SelectItemsPage implements OnInit {
  sSudent: any;
  datasF: any;
  nameCall: any;
  stuItemAmount: any;

  itemSelection: any;

  Itemsdatas: any;
  ItemsdataById: any;

  totalPrice: number = 0;
  nameArr: any[] = [];

  constructor(public network: NetworkService, public toast: ToastedService, private saveData: ForSaveService) {
    var datas = this.saveData.dataSave;
    this.nameCall = datas.username;
    console.log("from voucher page name: ", this.nameCall);
    this.network.getData('items').then(data => {
      this.Itemsdatas = data;
    });
    this.network.getSpecificDataforFather('students', this.nameCall).then(data => {
      this.datasF = data;
      console.log(this.datasF);
    });
  }

  ngOnInit() { }

  callItemById(id) {
    for (let i = 0; i < this.Itemsdatas.length; i++) {
      if (this.Itemsdatas[i].product_id == id) {
        this.ItemsdataById = this.Itemsdatas[i];
      }
    }
  }

  calDataByStuAmount() {
    for (let i = 0; i < this.datasF.length; i++) {
      if (this.datasF[i].id == this.sSudent) {
        this.stuItemAmount = this.datasF[i];
      }
    }
    console.log("from select: ", this.stuItemAmount.id, this.stuItemAmount.username);
  }

  onChange(e) {
    var arr = [];
    console.log("from onch: ", this.stuItemAmount.id, this.stuItemAmount.username);
    for (let i = 0; i < e.length; i++) {
      this.callItemById(e[i]);
      var task = { quantity: this.ItemsdataById.quantity - 1 };
      this.network.putDataById('items', e[i], task).then(data => {
        console.log("Succesfully update items quantity", data);
      });
      console.log(e[i]);
      arr.push(this.ItemsdataById.product_name);
      this.totalPrice += this.ItemsdataById.product_price;
    }
    console.log(this.totalPrice);
    this.nameArr = arr;
    var task2 = { ItemAmount: this.totalPrice };
    console.log(task2);
    this.network.putDataById('students', this.stuItemAmount.id, task2).then(data => {
      console.log("Succesfully update student itemAmount", data);
    });
    var savv = this.stuItemAmount.SaveAmount += this.totalPrice;
    console.log(savv);
    var tas = { SaveAmount: savv };
    console.log(tas);
    this.network.putDataById('students', this.stuItemAmount.id, tas).then(data => {
      console.log("Succesfully update student itemAmount", data);
    });
  }

  select() {
    var taskw = {selectedItems: this.nameArr};
    this.network.putDataById('students', this.sSudent, taskw).then(data => {
      console.log(data);
    });
    this.toast.showToast("Items selected successfully!");
  }

}
