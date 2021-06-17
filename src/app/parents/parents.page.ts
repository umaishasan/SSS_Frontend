import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {
  datas = [];
  VerifyEmail: any;

  constructor(private save: ForSaveService, private network: NetworkService) {
    var arr;
    this.VerifyEmail = this.save.ema;
    this.network.getData("parents").then(data =>{
      arr = data;
      console.log(arr);
      for(let i=0;i<arr.length;i++){
        if(arr[i].email === this.VerifyEmail){
          this.save.pid = arr[i].id;
          this.save.amount = arr[i].SaveAmount;
          this.datas.push(arr[i]);
        }
      }
    });
  }

  ngOnInit() { }
  
}
