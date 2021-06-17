import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-resultp',
  templateUrl: './resultp.page.html',
  styleUrls: ['./resultp.page.scss'],
})
export class ResultpPage implements OnInit {
  idCall: any;
  datasF: any;
  sSudent: any;
  resultdata: any;
  classCall: any;
  showSubjectO: boolean = false;
  showSubjectN: boolean = false;
  showSubjectT: boolean = false;

  constructor(private network: NetworkService, private saveData: ForSaveService) {
    this.idCall = this.saveData.pid;
    this.network.getSpecificDataforFather('students', this.idCall).then(data => {
      this.datasF = data;
      console.log(this.datasF);
    });
  }

  resultShoww() {
    for (let i = 0; i < this.datasF.length; i++) {
      if (this.datasF[i].id == this.sSudent) {
        this.classCall = this.datasF[i].class;
        console.log(this.classCall);
        this.ResultclassCall(this.classCall,this.sSudent);
      }
    }
    if (this.classCall == 9) {
      this.showSubjectN = true;
      this.showSubjectT = false;
      this.showSubjectO = false;
    }
    else if (this.classCall == 10) {
      this.showSubjectT = true;
      this.showSubjectO = false;
      this.showSubjectN = false;
    }
    else{
      this.showSubjectO = true;
      this.showSubjectN = false;
      this.showSubjectT = false;
    }
  }

  ngOnInit() { }

  ResultclassCall(classids, id) {
    var res;
    this.network.getData("result-class" + classids + "s").then(data => {
      res = data;
      for (let i = 0; i < res.length; i++) {
        if (res[i].Id == id) {
          this.resultdata = res[i];
          console.log(this.resultdata.Eng);
        }
      }
    });
  }

}
