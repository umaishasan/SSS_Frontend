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
  idCall: any;
  stuItemAmount: any;

  itemSelection: any;

  Itemsdatas: any;
  ItemsdataById: any;

  totalPrice: number = 0;
  nameArr: any[] = [];

  canteenWallet: any;
  parentWallet: any;
  babDivshow: boolean = false;

  constructor(private network: NetworkService, private toast: ToastedService, private saveData: ForSaveService) {
    this.idCall = this.saveData.pid;
    console.log("from select-item page id: ", this.idCall);
    this.network.getData('items').then(data => {
      this.Itemsdatas = data;
    });
    this.network.getSpecificDataforFather('students', this.idCall).then(data => {
      this.datasF = data;
      console.log(this.datasF);
    });
    this.network.getDataForWallet('canteens', 1, "wallet").then(data => {
      this.canteenWallet = data;
    });
    this.network.getDataForWalletParent('parents', this.idCall, "SaveAmount","DeductAmount").then(data => {
      this.parentWallet = data;
    });
  }

  puttingData(tableName,id,task){
    this.network.putDataById(tableName, id, task,'Uploading Error','Please try again!').then(data => {
      console.log("Succesfully update student itemAmount", data);
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
      this.puttingData("items",e[i],task);
      console.log(e[i]);
      arr.push(this.ItemsdataById.product_name);
      this.nameArr = arr;
      this.totalPrice += this.ItemsdataById.product_price;
    }
    console.log(this.totalPrice);
    var task2 = { ItemAmount: this.totalPrice };
    console.log(task2);
    this.puttingData("students",this.stuItemAmount.id,task2);

    for (let i = 0; i < this.canteenWallet.length; i++) {
      var waletAdded = this.canteenWallet[i].wallet += this.totalPrice;
      var task3 = { wallet: waletAdded };
      console.log(task3);
      this.puttingData("canteens",1,task3);
    }

    for(let i=0;i<this.parentWallet.length;i++){
      var waletMinus: number = this.parentWallet[i].SaveAmount -= this.totalPrice;
      var waletMinu: number = this.parentWallet[i].DeductAmount += this.totalPrice;
      var task4 = {SaveAmount: waletMinus, DeductAmount: waletMinu};
      console.log(task4);
      this.puttingData("parents",this.idCall,task4);
    }
    this.babDivshow = true;
  }

  select() {
    var taskw = { selectedItems: this.nameArr };
    this.puttingData("students",this.stuItemAmount.id,taskw);
    this.toast.showToast("Items selected successfully!");
  }

}
