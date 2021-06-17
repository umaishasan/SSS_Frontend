import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

interface Classe {
  id: number,
  name: string
}
@Component({
  selector: 'app-dairy',
  templateUrl: './dairy.page.html',
  styleUrls: ['./dairy.page.scss'],
})
export class DairyPage implements OnInit {
  annouce:any;
  idCall: any;
  datasF: any;
  sSudent: any;
  classs: any;

  constructor(private network: NetworkService, private saveData: ForSaveService) { 
    this.idCall = this.saveData.pid;
    console.log("from voucher page id: ", this.idCall);
    this.network.getSpecificDataforFather('students', this.idCall).then(data => {
      this.datasF = data;
      console.log(this.datasF);
    });
  }

  ngOnInit() { }

  converrr(){
    for(let i=0;i<this.datasF.length;i++){
      if(this.datasF[i].id == this.sSudent){
        this.classs = this.datasF[i].class;
        console.log(this.classs);
        this.network.getDataForAnnouncement('annoucements',this.classs,"annoucement").then(data =>{
          this.annouce = data;
        });
      }
    }
  }

}
