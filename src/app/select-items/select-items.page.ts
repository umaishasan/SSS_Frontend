import { Component, OnInit } from '@angular/core';
import { ParentsPage } from '../parents/parents.page';
import { ToastedService } from '../service/toasted.service';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-select-items',
  templateUrl: './select-items.page.html',
  styleUrls: ['./select-items.page.scss'],
})
export class SelectItemsPage implements OnInit {
  ids: number;
  itemSelection: any;

  Itemsdatas: any;
  ItemsdataById: any;

  studentItemAmount: any;

  totalPrice: number = 0;
  nameArr:any[] = [];

  constructor(public network: NetworkService,
    public par: ParentsPage,
    public toast: ToastedService) {
    this.network.getData('items').then(data => {
      this.Itemsdatas = data;
    });
    this.network.getData('items').then(data => {
      this.Itemsdatas = data;
    });
  }

  ngOnInit() { }

  onChange(e) {
    var arr = [];
    for(let i = 0; i < e.length; i++) {
      this.callItemById(e[i]);
      var task = { quantity: this.ItemsdataById.quantity - 1 };

      this.network.putDataById('items', e[i], task).then(data => {
        console.log("Succesfully update items quantity", data);
      });

      console.log(e[i]);
      this.totalPrice += this.ItemsdataById.product_price;

      var task2 = { ItemAmount: this.studentItemAmount += this.ItemsdataById.product_price };
      this.network.putDataById('students', this.ids, task2).then(data => {
        console.log("Succesfully update student itemAmount", data);
      });
      
      arr.push(this.ItemsdataById.product_name);
    }
    this.nameArr = arr;
  }

  callItemById(id) {
    for (let i = 0; i < this.Itemsdatas.length; i++) {
      if (this.Itemsdatas[i].product_id == id) {
        this.ItemsdataById = this.Itemsdatas[i];
      }
    }
  }

  select() {
    var task = {
      selectedItems: this.nameArr
    };
    this.network.putDataById('students',this.ids,task).then(data=>{
      console.log(data);
    });
    this.toast.showToast("Items selected successfully!");
  }

}
