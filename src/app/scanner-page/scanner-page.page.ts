import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.page.html',
  styleUrls: ['./scanner-page.page.scss'],
})
export class ScannerPagePage implements OnInit {
  scanned = null;
  studentData: any;
  studentDataById: any;
  //for send deta
  forHome: any;
  forQuiz: any;
  forResult: any;

  studentPage = [
    { title: 'Home', url: '/student', icon: 'home' },
    { title: 'Class', url: '/classed', icon: 'book' }
  ];

  constructor(public router: Router, public appComp: AppComponent, private barcodeScanner: BarcodeScanner, public network: NetworkService, public saveData: ForSaveService) {
    this.network.getData('students').then(data => {
      this.studentData = data;
      console.log(this.studentData);
    });
  }

  ngOnInit() { }

  HomeclassCall(ids) {
    this.network.getData("class" + ids + "s").then(data => {
      this.forHome = data;
      for (let i = 0; i < this.forHome.length; i++) {
        if (this.forHome[i].user == "Teacher" || this.forHome[i].user == "teacher") {
          this.saveData.homeWork.push(this.forHome[i]);
        }
      }
    });
  }

  QuizclassCall(ids) {
    this.network.getData("quiz-class" + ids + "s").then(data => {
      this.forQuiz = data;
      this.saveData.quizWork = this.forQuiz;
    });
  }

  ResultclassCall(ids, idd) {
    this.network.getData("result-class" + ids + "s").then(data => {
      this.forResult = data;
      for (let i = 0; i < this.forResult.length; i++) {
        if (this.forResult[i].Id == idd) {
          this.saveData.resultWork = this.forResult[i];
        }
      }
    });
  }

  //real
  scanCode() {
    this.barcodeScanner.scan().then(code => {
      this.scanned = code.text;
      for (let i = 0; i < this.studentData.length; i++) {
        this.studentDataById = this.studentData[i];
        if (this.scanned === this.studentDataById.qrString) {
          this.router.navigateByUrl('/student');
          this.appComp.appPages = this.studentPage;
          this.appComp.username = this.studentDataById.username;
          this.saveData.ForStuDataSave = this.studentDataById;
          this.HomeclassCall(this.studentDataById.class);
          this.QuizclassCall(this.studentDataById.class);
          this.ResultclassCall(this.studentDataById.class,this.studentDataById.id);
        }
      }
    });
  }

}
