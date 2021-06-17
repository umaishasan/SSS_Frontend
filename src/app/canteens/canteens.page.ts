import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-canteens',
  templateUrl: './canteens.page.html',
  styleUrls: ['./canteens.page.scss'],
})
export class CanteensPage implements OnInit {
  datas = [];
  VerifyEmail: any;

  constructor(private save: ForSaveService, private network: NetworkService) {
    var arr;
    this.VerifyEmail = this.save.ema;
    this.network.getData("canteens").then(data =>{
      arr = data;
      console.log(arr);
      for(let i=0;i<arr.length;i++){
        console.log(arr[i].email);
        if(arr[i].email === this.VerifyEmail){
          this.save.pid = arr[i].id;
          this.datas.push(arr[i]);
        }
      }
    });
  }

  ngOnInit() {
  }

}
