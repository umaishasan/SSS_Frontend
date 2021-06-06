import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

interface Classe {
  id: string,
  name: string
}
@Component({
  selector: 'app-teacher-upload-work',
  templateUrl: './teacher-upload-work.page.html',
  styleUrls: ['./teacher-upload-work.page.scss'],
})
export class TeacherUploadWorkPage implements OnInit {
  //common
  elementType: 'home' | 'quiz' | 'result' = "home";
  teacherId: any;
  showSubjectO: boolean = false;
  showSubjectN: boolean = false;
  showSubjectT: boolean = false;
  selectC: any;
  selectCU: any;
  selectCD: any;
  selectCO: any;
  subjectOE: any[] = ["Eng", "Urdu", "Math", "Sci", "Sst", "Isl", "Draw", "Sindhi"];
  subjectN: any[] = ["Eng", "Urdu", "Math", "Che", "Pst"];
  subjectT: any[] = ["Eng", "Urdu", "Phy", "Che", "Isl"];
  selectS: any;
  //for homework
  filess: any;
  classesForHome: Classe[] = [{ id: "class1s", name: 'Class1' }, { id: "class2s", name: 'Class2' }, { id: "class3s", name: 'Class3' }, { id: "class4s", name: 'Class4' }, { id: "class5s", name: 'Class5' }, { id: "class6s", name: 'Class6' }, { id: "class7s", name: 'Class7' }, { id: "class8s", name: 'Class8' }, { id: "class9s", name: 'Class9' }, { id: "class10s", name: 'Class10' }];
  //for quiz
  qno: number;
  ques: string;
  op1: string;
  op2: string;
  ans: string;
  classesForQuiz: Classe[] = [{ id: "quiz-class1s", name: 'Class1' }, { id: "quiz-class2s", name: 'Class2' }, { id: "quiz-class3s", name: 'Class3' }, { id: "quiz-class4s", name: 'Class4' }, { id: "quiz-class5s", name: 'Class5' }, { id: "quiz-class6s", name: 'Class6' }, { id: "quiz-class7s", name: 'Class7' }, { id: "quiz-class8s", name: 'Class8' }, { id: "quiz-class9s", name: 'Class9' }, { id: "quiz-class10s", name: 'Class10' }];
  //for result
  id: number;
  name: string;
  Eng: number;
  Math: number;
  Urdu: number;
  Sci: number;
  Sst: number;
  Draw: number;
  Isl: number;
  Sindhi: number;
  Pst: number;
  Phy: number;
  Che: number;
  obtainedN: number;
  percent: number;
  grade: string;
  showSubjectON: boolean = false;
  showSubjectOT: boolean = false;
  showSubjectNT: boolean = false;
  showSubjectONT: boolean = false;
  classesForResult: Classe[] = [{ id: "result-class1s", name: 'Class1' }, { id: "result-class2s", name: 'Class2' }, { id: "result-class3s", name: 'Class3' }, { id: "result-class4s", name: 'Class4' }, { id: "result-class5s", name: 'Class5' }, { id: "result-class6s", name: 'Class6' }, { id: "result-class7s", name: 'Class7' }, { id: "result-class8s", name: 'Class8' }, { id: "result-class9s", name: 'Class9' }, { id: "result-class10s", name: 'Class10' }];
  attendance: number = 1;
  teacherClassData: any;
  meetId: string;
  assignment: any;
  dirPath: any;
  StudentList: any;
  StudentSelect: any;
  BufferVal: any;

  constructor(public network: NetworkService, public route: Router, public saveData: ForSaveService, public toast: ToastedService, private file: File) {
    this.segmentsChanges(this.elementType);
    var teacher = this.saveData.dataSave;
    this.teacherId = teacher.id;
    console.log("call from Upload works", this.teacherId);
  }

  ngOnInit() { }

  callStudents(clsas) {
    var studentsID;
    var arrr = [];
    this.network.getData(clsas).then(data => {
      studentsID = data;
      for (let i = 0; i < studentsID.length; i++) {
        if (studentsID[i].user == "Student" || studentsID[i].user == "student") {
          arrr.push(studentsID[i]);
          this.StudentList = arrr;
        }
      }
    });
  }

  segmentsChanges(events) {
    console.log("segments: ", events);
    if (events === 'home') { }
    else if (events === 'quiz') { }
    else if (events === 'result') { }
  }

  openUrl() {
    this.network.getDataById(this.selectCO, this.teacherId).then(data => {
      this.teacherClassData = data;
      console.log("call from openURL: ", this.teacherClassData);
      window.open('https://www.zoom.com', '_system', 'location=yes');
      var task = {
        Attendance: this.teacherClassData.Attendance += this.attendance
      };
      this.network.putDataById(this.selectCO, this.teacherId, task).then(data => {
        console.log(data);
      });
    });
    this.toast.showToast("Class connected successfully!");
  }

  AccordingtoClassSubjectForHomeO() {
    console.log(this.selectCO);
    if (this.selectCO == 'class9s') {
      this.showSubjectN = true;
      this.showSubjectT = false;
      this.showSubjectO = false;
    }
    else if (this.selectCO == 'class10s') {
      this.showSubjectT = true;
      this.showSubjectO = false;
      this.showSubjectN = false;
    }
    else {
      this.showSubjectO = true;
      this.showSubjectN = false;
      this.showSubjectT = false;
    }
  }
  AccordingtoClassSubjectForHomeU() {
    console.log(this.selectCU);
    if (this.selectCU == 'class9s') {
      this.showSubjectN = true;
      this.showSubjectT = false;
      this.showSubjectO = false;
    }
    else if (this.selectCU == 'class10s') {
      this.showSubjectT = true;
      this.showSubjectO = false;
      this.showSubjectN = false;
    }
    else {
      this.showSubjectO = true;
      this.showSubjectN = false;
      this.showSubjectT = false;
    }
  }
  AccordingtoClassSubjectForHomeD() {
    console.log(this.selectCD);
    if (this.selectCD == 'class9s') {
      this.showSubjectN = true;
      this.callStudents(this.selectCD);
      this.showSubjectT = false;
      this.showSubjectO = false;
    }
    else if (this.selectCD == 'class10s') {
      this.showSubjectT = true;
      this.callStudents(this.selectCD);
      this.showSubjectO = false;
      this.showSubjectN = false;
    }
    else if (this.selectCD == 'class1s' || this.selectCD == 'class2s' || this.selectCD == 'class3s' || this.selectCD == 'class4s' || this.selectCD == 'class5s' || this.selectCD == 'class6s' || this.selectCD == 'class7s' || this.selectCD == 'class8s') {
      this.showSubjectO = true;
      this.callStudents(this.selectCD);
      this.showSubjectN = false;
      this.showSubjectT = false;
    }
  }

  AccordingtoClassSubjectForQuiz() {
    console.log(this.selectC);
    if (this.selectC == 'quiz-class9s') {
      this.showSubjectN = true;
      this.showSubjectT = false;
      this.showSubjectO = false;
    }
    else if (this.selectC == 'quiz-class10s') {
      this.showSubjectT = true;
      this.showSubjectO = false;
      this.showSubjectN = false;
    }
    else {
      this.showSubjectO = true;
      this.showSubjectN = false;
      this.showSubjectT = false;
    }
  }

  AccordingtoClassSubjectForResult() {
    console.log(this.selectC);
    if (this.selectC == 'result-class9s') {
      this.showSubjectN = true;
      this.showSubjectONT = true;
      this.showSubjectON = true;
      this.showSubjectNT = true;
      this.showSubjectT = false;
      this.showSubjectO = false;
      this.showSubjectOT = false;
    }
    else if (this.selectC == 'result-class10s') {
      this.showSubjectT = true;
      this.showSubjectONT = true;
      this.showSubjectOT = true;
      this.showSubjectNT = true;
      this.showSubjectO = false;
      this.showSubjectN = false;
      this.showSubjectON = false
    }
    else {
      this.showSubjectO = true;
      this.showSubjectONT = true;
      this.showSubjectON = true;
      this.showSubjectOT = true;
      this.showSubjectN = false;
      this.showSubjectNT = false;
      this.showSubjectT = false;
    }
  }

  fileUploads(event) {
    const filey = event.target.files[0];
    console.log(filey);
    const reader = new FileReader();
    reader.readAsArrayBuffer(filey);
    reader.onload = () => {
      var fileArrBuff = reader.result;
      (window as any).global = window;
      // @ts-ignore
      window.Buffer = window.Buffer || require('buffer').Buffer;
      this.filess = Buffer.from(fileArrBuff);
      console.log("buffer: ", this.filess);
    };
    reader.onerror = (error) => {
      alert(error);
    }
  }

  uploadHome() {
    console.log("from button submit:", this.filess);
    this.selectSubject();
  }

  Transfrrrrr() {
    this.network.getSpecificDataforTeach(this.selectCD, this.StudentSelect, this.selectS).then(data => {
      this.assignment = data;
      console.log("direct: ", this.assignment);
      for (let i = 0; i < this.assignment.length; i++) {
        var arr: any = [this.assignment[i].Eng, this.assignment[i].Urdu, this.assignment[i].Math, this.assignment[i].Sci, this.assignment[i].Sst, this.assignment[i].Isl, this.assignment[i].Draw, this.assignment[i].Sindhi, this.assignment[i].Pst, this.assignment[i].Che, this.assignment[i].Phy];
        console.log("selected by assignment: ", this.assignment[i]);
        console.log("all by arr: ", arr);
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] !== undefined && arr[j] !== null) {
            console.log("assignments: ", arr[j]);
            (window as any).global = window;
            // @ts-ignore
            window.Buffer = window.Buffer || require('buffer').Buffer;
            this.BufferVal = Buffer.from(arr[j]);
          }
        }
      }
    });
  }

  DownloadHome() {
    this.Transfrrrrr();
    console.log("assignments buffer: ", this.BufferVal);
    var Uintt = new Uint8Array(this.BufferVal);
    var binaryArr = Uintt.buffer;
    var blob = new Blob([binaryArr], { type: 'application/docx' });
    console.log("assignments file: ", blob);
    let result = this.file.createDir(this.file.externalDataDirectory, "SchoolWork", true);
    result.then(data => {
      var dirPath = data.toURL();
      alert("Directory at " + dirPath);
      this.file.writeFile(dirPath, "newHomework.docx", blob, { replace: true });
      alert("File at " + dirPath);
    }).catch(err => {
      alert("Error: " + err);
    });
    this.toast.showToast("File download successfully!");
  }

  uploadWork(table, task, message) {
    this.network.putDataById(table, this.teacherId, task).then(data => {
      console.log(data);
    });
    this.toast.showToast(message);
  }

  postWork(table, task, message) {
    this.network.postData(table, task).then(data => {
      console.log(data);
    });
    this.toast.showToast(message);
  }

  selectSubject() {
    if (this.showSubjectO == true) {
      if (this.selectS == 'Eng') {
        var ote = { Eng: this.filess };
        this.uploadWork(this.selectCU, ote, "successfully updated!");
      }
      else if (this.selectS == 'Urdu') {
        var ote2 = { Urdu: this.filess };
        this.uploadWork(this.selectCU, ote2, "successfully updated!");
      }
      else if (this.selectS == 'Math') {
        var ote3 = { Math: this.filess };
        this.uploadWork(this.selectCU, ote3, "successfully updated!");
      }
      else if (this.selectS == 'Sci') {
        var ote4 = { Sci: this.filess };
        this.uploadWork(this.selectCU, ote4, "successfully updated!");
      }
      else if (this.selectS == 'Sst') {
        var ote5 = { Sst: this.filess };
        this.uploadWork(this.selectCU, ote5, "successfully updated!");
      }
      else if (this.selectS == 'Isl') {
        var ote6 = { Isl: this.filess };
        this.uploadWork(this.selectCU, ote6, "successfully updated!");
      }
      else if (this.selectS == 'Draw') {
        var ote7 = { Draw: this.filess };
        this.uploadWork(this.selectCU, ote7, "successfully updated!");
      }
      else if (this.selectS == 'Sindhi') {
        var ote8 = { Sindhi: this.filess };
        this.uploadWork(this.selectCU, ote8, "successfully updated!");
      }
    }
    else if (this.showSubjectN == true) {
      if (this.selectS == 'Eng') {
        var n = { Eng: this.filess };
        this.uploadWork(this.selectCU, n, "successfully updated!");
      }
      else if (this.selectS == 'Urdu') {
        var n2 = { Urdu: this.filess };
        this.uploadWork(this.selectCU, n2, "successfully updated!");
      }
      else if (this.selectS == 'Math') {
        var n3 = { Math: this.filess };
        this.uploadWork(this.selectCU, n3, "successfully updated!");
      }
      else if (this.selectS == 'Che') {
        var n4 = { Che: this.filess };
        this.uploadWork(this.selectCU, n4, "successfully updated!");
      }
      else if (this.selectS == 'Pst') {
        var n5 = { Pst: this.filess };
        this.uploadWork(this.selectCU, n5, "successfully updated!");
      }
    }
    else if (this.showSubjectT == true) {
      if (this.selectS == 'Eng') {
        var t = { Eng: this.filess };
        this.uploadWork(this.selectCU, t, "successfully updated!");
      }
      else if (this.selectS == 'Urdu') {
        var t2 = { Urdu: this.filess };
        this.uploadWork(this.selectCU, t2, "successfully updated!");
      }
      if (this.selectS == 'Phy') {
        var t3 = { Phy: this.filess };
        this.uploadWork(this.selectCU, t3, "successfully updated!");
      }
      else if (this.selectS == 'Che') {
        var t4 = { Che: this.filess };
        this.uploadWork(this.selectCU, t4, "successfully updated!");
      }
      if (this.selectS == 'Isl') {
        var t5 = { Isl: this.filess };
        this.uploadWork(this.selectCU, t5, "successfully updated!");
      }
    }
  }

  submitQuiz() {
    var task = {
      Subject: this.selectS,
      QNo: this.qno,
      Q: this.ques,
      Option1: this.op1,
      Option2: this.op2,
      Ans: this.ans
    };
    this.postWork(this.selectC, task, "Quiz uploaded successfully!");
  }

  DeleteQuiz() {
    var forDel;
    this.network.getSpecificDataforQuiz(this.selectC, this.selectS).then(data => {
      console.log(data);
      forDel = data;
      for (let i = 0; i < forDel.length; i++) {
        console.log(forDel[i].QNo);
        this.network.delData(this.selectC, forDel[i].QNo).then(data => {
          console.log(data);
        });
      }
    });
    this.toast.showToast("Reset successfully!");
  }

  makeGrade() {
    if (this.percent < 50) {
      this.grade = 'F';
    }
    else if (this.percent <= 60) {
      this.grade = 'C';
    }
    else if (this.percent <= 70) {
      this.grade = 'B';
    }
    else if (this.percent <= 80) {
      this.grade = 'A';
    }
    else if (this.percent <= 100) {
      this.grade = 'A+';
    }
  }

  submitResult() {
    if (this.selectC == 'result-class9s') {
      this.obtainedN = this.Eng + this.Urdu + this.Math + this.Che + this.Pst;
      console.log(this.obtainedN);
      this.percent = (this.obtainedN / 500) * 100;
      console.log(this.percent);
      this.makeGrade();
      var taskn = {
        Id: this.id,
        Name: this.name,
        Eng: this.Eng,
        Urdu: this.Urdu,
        Math: this.Math,
        Pst: this.Pst,
        Che: this.Che,
        Total: 500,
        Obtained: this.obtainedN,
        Percentage: this.percent,
        Grade: this.grade
      };
      this.postWork(this.selectC, taskn, "Result uploaded successfully!");
    }
    else if (this.selectC == 'result-class10s') {
      this.obtainedN = this.Eng + this.Urdu + this.Phy + this.Che + this.Isl;
      console.log(this.obtainedN);
      this.percent = (this.obtainedN / 500) * 100;
      console.log(this.percent);
      this.makeGrade();
      var taskt = {
        Id: this.id,
        Name: this.name,
        Eng: this.Eng,
        Urdu: this.Urdu,
        Phy: this.Phy,
        Che: this.Che,
        Isl: this.Isl,
        Total: 500,
        Obtained: this.obtainedN,
        Percentage: this.percent,
        Grade: this.grade
      };
      this.postWork(this.selectC, taskt, "Result uploaded successfully!");
    }
    else {
      this.obtainedN = this.Eng + this.Urdu + this.Math + this.Sci + this.Sst + this.Isl + this.Draw + this.Sindhi;
      this.percent = (this.obtainedN / 500) * 100;
      this.makeGrade();
      var tasko = {
        Id: this.id,
        Name: this.name,
        Eng: this.Eng,
        Urdu: this.Urdu,
        Math: this.Math,
        Sci: this.Sci,
        Sst: this.Sst,
        Isl: this.Isl,
        Draw: this.Draw,
        Sindhi: this.Sindhi,
        Total: 500,
        Obtained: this.obtainedN,
        Percentage: this.percent,
        Grade: this.grade
      };
      this.postWork(this.selectC, tasko, "Result uploaded successfully!");
    }
  }

  doRefresh(event) {
    this.route.navigate(['teacherUploadWork']);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
