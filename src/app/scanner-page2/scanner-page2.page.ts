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
  studentDataById: any;
  show: any;

  constructor(public network: NetworkService,private barcodeScanner: BarcodeScanner) {
    this.network.getData('students').then(data => {
      this.studentData = data;
    });
  }

  ngOnInit() { }

  scanCode() {
    this.barcodeScanner.scan().then(code => {
      this.scanned = code.text;
      for (let i = 0; i < this.studentData.length; i++) {
        this.studentDataById = this.studentData[i];
        if (this.scanned === this.studentDataById.qrString) {
          this.show = this.studentDataById.selectedItems;
        }
      }
    });
  }
}
