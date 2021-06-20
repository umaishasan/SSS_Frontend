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
  StuDataAll: any;
  StuDataAllByid: any;
  selectStu: any;
  dirPath: string;
  generatedImage: any;

  constructor(private network: NetworkService, private toast: ToastedService, private file: File) {
    this.network.getData('students').then(data => {
      this.StuDataAll = data;
      console.log(this.StuDataAll);
    });
  }

  ngOnInit() { }

  onChangee() {
    var sav;
    for (let i = 0; i < this.StuDataAll.length; i++) {
      if(this.StuDataAll[i].id == this.selectStu){
        sav = this.StuDataAll[i];
        this.StuDataAllByid = sav;
      }
    }
  }

  showCard() {  
    var arr = [];
    domtoimage.toCanvas(document.getElementById('card')).then(function (canvas) {
      var imagee = canvas.toDataURL("image/png");
      arr.push(imagee);
    });
    this.generatedImage = arr;
  }

  downloadCard() {
    console.log(this.generatedImage);
    this.toast.loadControlShow(5000);
    for (let i = 0; i < this.generatedImage.length; i++) {
      var realImg = this.generatedImage[i].split(',');
      console.log(realImg);
      console.log(realImg[0]);
      console.log(realImg[1]);
      const bytes: string = atob(realImg[1]);
      console.log(bytes);
      const byteNumbers = new Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        byteNumbers[i] = bytes.charCodeAt(i);
      }
      console.log(byteNumbers);
      const byteArray = new Uint8Array(byteNumbers);
      console.log(byteArray);
      const blob: Blob = new Blob([byteArray], { type: 'image/png' });
      console.log(blob);
      let result = this.file.createDir(this.file.externalDataDirectory, "SaveCard", true);
      result.then(data => {
        this.dirPath = data.toURL();
        this.toast.loadControlDismiss();
        this.toast.alertMessage("Directory path", "Directory created at: " + this.dirPath);
        this.file.writeFile(this.dirPath, "Card.png", blob, { replace: true });
        this.toast.alertMessage("File path", "File created at: " + this.dirPath);
        this.toast.showToast("File download successfully!");
      }).catch(err => {
        this.toast.alertMessage("Error", "Error: " + err);
      });
    }
  }

}
