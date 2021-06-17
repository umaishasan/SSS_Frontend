import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  amount: any;

  constructor(private saveData: ForSaveService) {
    this.amount = this.saveData.amount;
    console.log(this.amount);
  }

  ngOnInit() {  }

}
