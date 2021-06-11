import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner-page2',
  templateUrl: './scanner-page2.page.html',
  styleUrls: ['./scanner-page2.page.scss'],
})
export class ScannerPage2Page implements OnInit {
  scanned = null;
  studentData: any;
  show: any;
  canteenData: any;
  showAmount: any;

  constructor(public network: NetworkService, private barcodeScanner: BarcodeScanner) {
    this.network.getData('canteens').then(data => {
      this.canteenData = data;
      console.log(this.canteenData);
    });
    this.network.getData('students').then(data => {
      this.studentData = data;
      console.log(this.studentData);
    });
  }

  ngOnInit() { }

  scanCode() {
    this.barcodeScanner.scan().then(code => {
      this.scanned = code.text;
      for (let i = 0; i < this.studentData.length; i++) {
        if (this.scanned === this.studentData[i].qrString) {
          this.show = this.studentData[i].selectedItems;
          this.showAmount = this.studentData[i].ItemAmount;
        }
      }
      console.log(this.show);
      console.log(this.showAmount);
      for(let i=0;i<this.canteenData.length;i++){
        console.log(this.canteenData[i]);
        console.log(this.canteenData[i].id,this.canteenData[i].username,this.canteenData[i].wallet);
        var tsk = {wallet: this.canteenData[i].wallet += this.showAmount}
        this.network.putDataById('canteens',this.canteenData[i].id,tsk).then(data =>{
          console.log(data);
        });
      }
    });
  }

}
