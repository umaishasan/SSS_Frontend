import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Classe {
  id: string,
  name: string
}
interface Subject {
  name: string,
  sub: any
}
@Component({
  selector: 'app-teacher-upload-work',
  templateUrl: './teacher-upload-work.page.html',
  styleUrls: ['./teacher-upload-work.page.scss'],
})
export class TeacherUploadWorkPage implements OnInit {
  @ViewChild('overlapAnimateO', { read: ElementRef }) overlapAnimateO: ElementRef;
  @ViewChild('overlapAnimateU', { read: ElementRef }) overlapAnimateU: ElementRef;
  @ViewChild('overlapAnimateD', { read: ElementRef }) overlapAnimateD: ElementRef;
  arrowToggleiconO: 'chevron-down' | 'chevron-up' = 'chevron-down';
  arrowToggleiconU: 'chevron-down' | 'chevron-up' = 'chevron-down';
  arrowToggleiconD: 'chevron-down' | 'chevron-up' = 'chevron-down';
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
  subNam: Subject[];
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
  dataa: any;
  sSudent: any;
  studentIdd: any;
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
  teacherClassData = [];
  meetId: string;
  assignment: any;
  dirPath: any;
  StudentList: any;
  StudentSelect: any;
  BufferVal: any;
  RegisterForQuiz: FormGroup;

  constructor(private network: NetworkService, private renderer: Renderer2, private route: Router, private saveData: ForSaveService, private toast: ToastedService, private file: File) {
    this.segmentsChanges(this.elementType);
    this.teacherId = this.saveData.pid + "t";
    console.log("call from Upload works", this.teacherId);
    this.RegisterForQuiz = new FormGroup({
      QNo: new FormControl('', Validators.required),
      Q: new FormControl('', Validators.required),
      O1: new FormControl('', Validators.required),
      O2: new FormControl('', Validators.required),
      A: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }

  callStudents(clsas) {
    var studentsID;
    var arrr = [];
    this.network.getData(clsas).then(data => {
      studentsID = data;
      for (let i = 0; i < studentsID.length; i++) {
        if (studentsID[i].user == "students") {
          arrr.push(studentsID[i]);
          this.StudentList = arrr;
        }
      }
      var arr = [];
    });
  }
  segmentsChanges(events) {
    console.log("segments: ", events);
    if (events === 'home') { }
    else if (events === 'quiz') { }
    else if (events === 'result') { }
  }

  openUrl() {
    for (let i = 0; i < this.teacherClassData.length; i++) {
      var task = { Attendance: this.teacherClassData[i].Attendance += this.attendance };
      console.log(task);
      this.network.putDataById(this.selectCO, this.teacherId, task, 'Uploading Error', 'Please try again!').then(data => {
        console.log(data);
      });
    }
    window.open('https://www.zoom.com', '_system', 'location=yes');
    this.toast.showToast("Class connected successfully!");
  }

  AccordingtoClassSubjectForHomeO() {
    console.log(this.selectCO);
    this.network.getDataById(this.selectCO, this.teacherId).then(data => {
      this.teacherClassData.push(data);
      console.log("call from AccordingtoClassSubjectForHomeO: ", this.teacherClassData);
    });
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
    var justClass = this.selectC.split('-');
    console.log(justClass[1]);
    this.network.getSpecificDataforAttendance(justClass[1], "students").then(data => {
      this.dataa = data;
      console.log("all data", this.dataa);
      for (let i = 0; i < this.dataa.length; i++) {
        this.studentIdd = this.dataa[i];
      }
    });
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
      this.toast.alertMessage("Error", "Error: " + error);
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
      console.log(this.StudentSelect);
      for (let i = 0; i < this.assignment.length; i++) {
        this.subNam = [{ name: "Eng", sub: this.assignment[i].Eng },
        { name: "Urdu", sub: this.assignment[i].Urdu }, { name: "Math", sub: this.assignment[i].Math }, { name: "Sci", sub: this.assignment[i].Sci },
        { name: "Sst", sub: this.assignment[i].Sst }, { name: "Isl", sub: this.assignment[i].Isl }, { name: "Draw", sub: this.assignment[i].Draw },
        { name: "Sindhi", sub: this.assignment[i].Sindhi }, { name: "Pst", sub: this.assignment[i].Pst }, { name: "Che", sub: this.assignment[i].Che }, { name: "Phy", sub: this.assignment[i].Phy }];
        console.log(this.subNam);
        for (let j = 0; j < this.subNam.length; j++) {
          if (this.subNam[j].name == this.selectS && this.subNam[j].sub != undefined) {
            (window as any).global = window;
            // @ts-ignore
            window.Buffer = window.Buffer || require('buffer').Buffer;
            this.BufferVal = Buffer.from(this.subNam[j].sub.data);
            console.log(this.BufferVal);
            break;
          }
          else if(this.subNam[j].name == this.selectS && this.subNam[j].sub == undefined){
            this.toast.alertMessage("File Error","File is not available!");
            break;
          }
        }
      }
    });
  }

  DownloadHome() {
    this.Transfrrrrr();
    this.toast.loadControlShow(5000);
    console.log("assignments buffer: ", this.BufferVal);
    var Uintt = new Uint8Array(this.BufferVal);
    var binaryArr = Uintt.buffer;
    var blob = new Blob([binaryArr], { type: 'application/docx' });
    console.log("assignments file: ", blob);
    let result = this.file.createDir(this.file.externalDataDirectory, "SchoolWork", true);
    result.then(data => {
      this.dirPath = data.toURL();
      this.toast.loadControlDismiss();
      this.toast.alertMessage("Directory path", "Directory created at: " + this.dirPath);
      this.file.writeFile(this.dirPath, "newHomework.docx", blob, { replace: true });
      this.toast.alertMessage("File path", "File created at: " + this.dirPath);
      this.toast.showToast("File download successfully!");
    }).catch(err => {
      this.toast.alertMessage("Error", "Error: " + err);
    });
  }

  uploadWork(table, task, message) {
    this.toast.loadControlShow(5000);
    this.network.putDataById(table, this.teacherId, task, 'Uploading Error', 'Please try again!').then(data => {
      console.log(data);
      this.toast.loadControlDismiss();
      this.toast.showToast(message);
    });
  }

  postWork(table, task, message) {
    this.toast.loadControlShow(5000);
    this.network.postData(table, task, 'Uploading Error', 'Please try again and fills all fields.').then(data => {
      console.log(data);
      this.toast.loadControlDismiss();
      this.toast.showToast(message);
    });
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
      QNo: this.qno + this.selectS,
      Q: this.ques,
      Option1: this.op1,
      Option2: this.op2,
      Ans: this.ans
    };
    this.postWork(this.selectC, task, "Quiz uploaded successfully!");
  }

  DeleteQuiz() {
    var forDel;
    this.toast.loadControlShow(5000);
    this.network.getSpecificDataforQuiz(this.selectC, this.selectS).then(data => {
      console.log(data);
      forDel = data;
      for (let i = 0; i < forDel.length; i++) {
        console.log(forDel[i].QNo);
        this.network.delData(this.selectC, forDel[i].QNo, 'Deleting Error', 'You may select invalid Q.No or subject.').then(data => {
          console.log(data);
          this.toast.loadControlDismiss();
          this.toast.showToast("Reset successfully!");
        });
      }
    });
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
    console.log(this.studentIdd.name, this.studentIdd.id);
    if (this.selectC == 'result-class9s') {
      this.obtainedN = this.Eng + this.Urdu + this.Math + this.Che + this.Pst;
      console.log(this.obtainedN);
      this.percent = (this.obtainedN / 500) * 100;
      console.log(this.percent);
      this.makeGrade();
      var taskn = {
        Id: this.studentIdd.id,
        Name: this.studentIdd.name,
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
        Id: this.studentIdd.id,
        Name: this.studentIdd.name,
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
        Id: this.studentIdd.id,
        Name: this.studentIdd.name,
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

  arrowTogleO() {
    if (this.arrowToggleiconO == 'chevron-down') {
      this.arrowToggleiconO = 'chevron-up';
      console.log('online div show', this.overlapAnimateO.nativeElement);
      this.renderer.setStyle(this.overlapAnimateO.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.overlapAnimateO.nativeElement, 'animation', 'fade-in 1s');
    } else {
      this.arrowToggleiconO = 'chevron-down';
      this.renderer.setStyle(this.overlapAnimateO.nativeElement, 'display', 'none');
    }
  }
  arrowTogleU() {
    if (this.arrowToggleiconU == 'chevron-down') {
      this.arrowToggleiconU = 'chevron-up';
      console.log('online div show', this.overlapAnimateU.nativeElement);
      this.renderer.setStyle(this.overlapAnimateU.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.overlapAnimateU.nativeElement, 'animation', 'fade-in 1s');
    } else {
      this.arrowToggleiconU = 'chevron-down';
      this.renderer.setStyle(this.overlapAnimateU.nativeElement, 'display', 'none');
    }
  }
  arrowTogleD() {
    if (this.arrowToggleiconD == 'chevron-down') {
      this.arrowToggleiconD = 'chevron-up';
      console.log('online div show', this.overlapAnimateD.nativeElement);
      this.renderer.setStyle(this.overlapAnimateD.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.overlapAnimateD.nativeElement, 'animation', 'fade-in 1s');
    } else {
      this.arrowToggleiconD = 'chevron-down';
      this.renderer.setStyle(this.overlapAnimateD.nativeElement, 'display', 'none');
    }
  }

}