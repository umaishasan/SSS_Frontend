import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import { File } from '@ionic-native/file/ngx';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ForSaveService } from '../service/for-save';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  // id: number;
  Voucher: any;
  dirPath: any;
  datasF: any;
  datasD: any;
  idCall: any;
  sSudent: any;

  constructor(private network: NetworkService, private toast: ToastedService, private saveData: ForSaveService, private file: File) {
    this.idCall = this.saveData.pid;
    console.log("from voucher page id: ", this.idCall);
    this.network.getSpecificDataforFather('students', this.idCall).then(data => {
      this.datasF = data;
      console.log(this.datasF);
    });
  }

  ngOnInit() { }

  converrr() {
    var datasV;
    this.network.getDataForVoucher('students', this.sSudent).then(data => {
      datasV = data;
      for(let i=0;i<datasV.length;i++){
        console.log(datasV[i]);
        this.Voucher = datasV[i].Voucher;
      }
    });
  }

  download() {
    console.log(this.Voucher.data);
    this.toast.loadControlShow(5000);
    let utf8 = new Uint8Array(this.Voucher.data);
    console.log("utf8: ", utf8);
    let binaryArray = utf8.buffer;
    console.log("binaryArray: ", binaryArray);
    var blob = new Blob([binaryArray], { type: 'application/pdf' });
    console.log("blob: ", blob);
    let result = this.file.createDir(this.file.externalDataDirectory, "Voucher", true);
    result.then(data => {
      this.dirPath = data.toURL();
      this.toast.loadControlDismiss();
      this.toast.alertMessage("Directory path", "Directory created at: " + this.dirPath);
      this.file.writeFile(this.dirPath, "Voucher.pdf", blob, { replace: false });
      this.toast.alertMessage("File path", "File created at: " + this.dirPath);
      this.toast.showToast("File download successfully!");
    }).catch(err => {
      this.toast.alertMessage("File Error", err);
    });
  }

}
