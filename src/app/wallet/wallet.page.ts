import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  amount: any;
  id: any;

  constructor(private network: NetworkService, private save: ForSaveService) {
    var amou;
    this.id = this.save.pid;
    this.network.getDataForWallet('canteens',this.id,"wallet").then(data =>{
      console.log(data);
      amou = data;
      for(let i=0;i<amou.length;i++){
        console.log(amou[i]);
        this.amount = amou[i].wallet;
      }
    });
  }

  ngOnInit() {  }

}
