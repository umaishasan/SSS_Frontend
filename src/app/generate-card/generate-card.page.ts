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
    this.network.getDataById('students', this.saveId).then(data => {
      this.StuData = data;
    });
  }

  convertImg() {
    this.showCard();
    var arr = [];
    domtoimage.toCanvas(document.getElementById('card')).then(function (canvas) {
      var generatedImage = canvas.toDataURL("image/png");
      (window as any).global = window;
      // @ts-ignore
      window.Buffer = window.Buffer || require('buffer').Buffer;
      var imgBuff = Buffer.from(generatedImage);
      var imgUint = new Uint8Array(imgBuff);
      var binaryArr = imgUint.buffer;
      var blob = new Blob([binaryArr], { type: 'image/png' });
      console.log("blob: ", blob);
      arr.push(blob);
    });
    this.generatedImage = arr;
  }

  downloadCard() {
    for (let i = 0; i < this.generatedImage.length; i++) {
      console.log(this.generatedImage[i]);
      let result = this.file.createDir(this.file.externalDataDirectory, "SaveCard", true);
      result.then(data => {
        var dirPath = data.toURL();
        alert("Directory at " + dirPath);
        this.file.writeFile(dirPath, "Card.png", this.generatedImage[i], { replace: true });
        alert("File at " + dirPath);
      }).catch(err => {
        alert("Error: " + err);
      });
    }
    this.toast.showToast("Card download successfully!");
  }
  
}
