import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-walletp',
  templateUrl: './walletp.page.html',
  styleUrls: ['./walletp.page.scss'],
})
export class WalletpPage implements OnInit {
  amountc: any;
  amountd: any;
  adamount: number;
  id: any;

  constructor(private network: NetworkService, private save: ForSaveService, private toast: ToastedService) {
    var amou;
    this.id = this.save.pid;
    this.network.getDataForWalletParent('parents',this.id,"SaveAmount","DeductAmount").then(data =>{
      console.log(data);
      amou = data;
      for(let i=0;i<amou.length;i++){
        console.log(amou[i]);
        this.amountc = amou[i].SaveAmount;
        this.amountd = amou[i].DeductAmount;
      }
    });
  }

  ngOnInit() { }

  addAmount(){
    this.toast.loadControlShow(3000);
    var task = {SaveAmount: this.adamount};
    this.network.putDataById('parents',this.id,task,'Uploading Error','Please try again!').then(data =>{
      console.log(data);
      this.toast.showToast("Amount add successfully!");
    });
  }

}
