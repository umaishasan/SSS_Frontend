import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import domtoimage from 'dom-to-image-more';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-generate-card',
  templateUrl: './generate-card.page.html',
  styleUrls: ['./generate-card.page.scss'],
})
export class GenerateCardPage implements OnInit {
  StuData: any;
  saveId: number;
  dirPath: string;
  generatedImage: any;

  constructor(public network: NetworkService, public toast: ToastedService, private file: File) { }

  ngOnInit() { }

  showCard() {
    var arr = [];
    this.network.getDataById('students', this.saveId).then(data => {
      this.StuData = data;
    });
    domtoimage.toCanvas(document.getElementById('card')).then(function (canvas) {
      var imagee = canvas.toDataURL("image/png");
      (window as any).global = window;
      // @ts-ignore
      window.Buffer = window.Buffer || require('buffer').Buffer;
      var imgBuff = Buffer.from(imagee);
      console.log(imgBuff);
      arr.push(imgBuff);
    });
    this.generatedImage = arr;
  }

  downloadCard() {
    console.log(this.generatedImage);
    for (let i = 0; i < this.generatedImage.length; i++) {
      console.log(this.generatedImage[i]);
      var imgUint = new Uint8Array(this.generatedImage[i]);
      console.log(imgUint);
      var binaryArr = imgUint.buffer;
      console.log(binaryArr);
      var blob = new Blob([binaryArr], { type: 'image/png' });
      console.log("blob: ", blob);
      let result = this.file.createDir(this.file.externalDataDirectory, "SaveCard", true);
      result.then(data => {
        this.dirPath = data.toURL();
        alert("Directory at " + this.dirPath);
        this.file.writeFile(this.dirPath, "Card.png", blob, { replace: true });
        alert("File at " + this.dirPath);
      }).catch(err => {
        alert("Error: " + err);
      });
    }
  }

}
