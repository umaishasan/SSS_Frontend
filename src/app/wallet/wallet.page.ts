import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  amount: any;

  constructor(public saveData: ForSaveService) {
    var value = this.saveData.dataSave;
    console.log(value);
    this.amount = value.wallet;
    console.log(this.amount);
   }

  ngOnInit() {  }

}
