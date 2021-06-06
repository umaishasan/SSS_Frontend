import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import { File } from '@ionic-native/file/ngx';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  id: number;
  dataSave: any;
  dirPath: any;

  constructor(public network: NetworkService,public toast: ToastedService, private file: File) { }

  ngOnInit() { }

  converrr() {
    this.network.getDataForVoucher('students', this.id).then(data => {
      this.dataSave = data;
      console.log(this.dataSave);
    });
  }

  download() {
    this.converrr();
    console.log(this.dataSave);
    let utf8 = new Uint8Array(this.dataSave);
    let binaryArray = utf8.buffer;
    var blob = new Blob([binaryArray], { type: 'application/pdf' });
    console.log("blob: ", blob);
    let result = this.file.createDir(this.file.externalRootDirectory, "Voucher", true);
    result.then(data => {
      this.dirPath = data.toURL();
      this.file.writeFile(this.dirPath, "Voucher.pdf", blob, { replace: false });
      this.toast.alertMessage("File path", "File created at: " + this.dirPath);
    }).catch(err => {
      this.toast.alertMessage("File Error", err);
    });
    this.toast.showToast("File download successfully!");
  }
}
