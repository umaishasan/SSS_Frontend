import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { File } from '@ionic-native/file/ngx';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-classed',
  templateUrl: './classed.page.html',
  styleUrls: ['./classed.page.scss'],
})
export class ClassedPage implements OnInit {
  elementType: 'home' | 'quiz' | 'result' = "home";
  callProfile: any;
  studentClassData: any;
  homedata: any;
  selectTeacher: any;
  quizdata: any;
  quizdataAnswer: any;
  resultdata: any;
  showSubjectO: boolean = false;
  showSubjectN: boolean = false;
  showSubjectT: boolean = false;
  subjectOE: any[] = ["Eng", "Urdu", "Math", "Sci", "Sst", "Isl", "Draw", "Sindhi"];
  subjectN: any[] = ["Eng", "Urdu", "Math", "Che", "Pst"];
  subjectT: any[] = ["Eng", "Urdu", "Phy", "Che", "Isl"];
  selectS: any;
  attendance: number = 1;
  assignment: any;
  filesave: any;
  dirPath: any;
  score: number = 0;
  BufferVal: any;

  constructor(public saveData: ForSaveService, public network: NetworkService, public toast: ToastedService, private file: File) {
    this.homedata = this.saveData.homeWork;
    this.quizdata = this.saveData.quizWork;
    this.resultdata = this.saveData.resultWork;
    this.segmentsChanges(this.elementType);
    this.callProfile = this.saveData.ForStuDataSave;
    console.log(this.callProfile.id,this.callProfile.class);
    this.AccordingtoClassSubjectForHome();
    this.network.getDataById("class" + this.callProfile.class + "s", this.callProfile.id).then(data => {
      this.studentClassData = data;
    });
  }

  ngOnInit() { }

  segmentsChanges(events) {
    console.log("segments: ", events);
    if (events === 'home') { }
    else if (events === 'quiz') { }
    else if (events === 'result') { }
  }

  AccordingtoClassSubjectForHome() {
    if (this.callProfile.class == 'class9s') {
      this.showSubjectN = true;
      this.showSubjectT = false;
      this.showSubjectO = false;
    }
    else if (this.callProfile.class == 'class10s') {
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

  checkk(event) {
    var score = 0;
    var selectA = event.target.value;
    console.log(selectA);
    for (let i = 0; i < this.quizdata.length; i++) {
      this.quizdataAnswer = this.quizdata[i].Ans;
      if (selectA == this.quizdataAnswer) {
        console.log("original ans: ", this.quizdataAnswer);
        score++;
      }
    }
    this.score += score;
  }

  openUrl() {
    window.open('https://www.zoom.com', '_system', 'location=yes');
    var task = {
      Attendance: this.studentClassData.Attendance += this.attendance
    };
    this.network.putDataById("class" + this.callProfile.class + "s", this.callProfile.id, task).then(data => {
      console.log(data);
    });
  }

  transferrr() {
    this.network.getSpecificData("class" + this.callProfile.class + "s", this.selectTeacher, this.selectS).then(data => {
      this.assignment = data;
      for (let i = 0; i < this.assignment.length; i++) {
        var arr: any = [this.assignment[i].Eng, this.assignment[i].Urdu, this.assignment[i].Math, this.assignment[i].Sci, this.assignment[i].Sst, this.assignment[i].Isl, this.assignment[i].Draw, this.assignment[i].Sindhi, this.assignment[i].Pst, this.assignment[i].Che, this.assignment[i].Phy];
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] !== undefined && arr[j] !== null) {
            (window as any).global = window;
            // @ts-ignore
            window.Buffer = window.Buffer || require('buffer').Buffer;
            this.BufferVal = Buffer.from(arr[j]);
            console.log(this.BufferVal);
          }
        }
      }
    });
  }

  DownloadHome(){
    console.log(this.BufferVal);
    var Uintt = new Uint8Array(this.BufferVal);
    console.log(Uintt);
    var binaryArr = Uintt.buffer;
    console.log(binaryArr);
    var blob = new Blob([binaryArr], { type: 'application/docx' });
    console.log(blob);
    let result = this.file.createDir(this.file.externalDataDirectory, "SchoolHomework", true);
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
      this.filesave = Buffer.from(fileArrBuff);
      console.log("buffer: ", this.filesave);
    };
    reader.onerror = (error) => {
      alert(error);
    }
  }

  uploadWork(table, task, message) {
    this.network.putDataById(table, this.callProfile.id, task).then(data => {
      console.log(data);
    });
    this.toast.showToast(message);
  }

  selectSubject() {
    if (this.showSubjectO == true) {
      if (this.selectS == 'Eng') {
        var ote = { Eng: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote, "File upload successfully!");
      }
      else if (this.selectS == 'Urdu') {
        var ote2 = { Urdu: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote2, "File upload successfully!");
      }
      else if (this.selectS == 'Math') {
        var ote3 = { Math: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote3, "File upload successfully!");
      }
      else if (this.selectS == 'Sci') {
        var ote4 = { Sci: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote4, "File upload successfully!");
      }
      else if (this.selectS == 'Sst') {
        var ote5 = { Sst: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote5, "File upload successfully!");
      }
      else if (this.selectS == 'Isl') {
        var ote6 = { Isl: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote6, "File upload successfully!");
      }
      else if (this.selectS == 'Draw') {
        var ote7 = { Draw: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote7, "File upload successfully!");
      }
      else if (this.selectS == 'Sindhi') {
        var ote8 = { Sindhi: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", ote8, "File upload successfully!");
      }
    }
    else if (this.showSubjectN == true) {
      if (this.selectS == 'Eng') {
        var n = { Eng: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", n, "File upload successfully!");
      }
      else if (this.selectS == 'Urdu') {
        var n2 = { Urdu: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", n2, "File upload successfully!");
      }
      else if (this.selectS == 'Math') {
        var n3 = { Math: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", n3, "File upload successfully!");
      }
      else if (this.selectS == 'Che') {
        var n4 = { Che: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", n4, "File upload successfully!");
      }
      else if (this.selectS == 'Pst') {
        var n5 = { Pst: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", n5, "File upload successfully!");
      }
    }
    else if (this.showSubjectT == true) {
      if (this.selectS == 'Eng') {
        var t = { Eng: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", t, "File upload successfully!");
      }
      else if (this.selectS == 'Urdu') {
        var t2 = { Urdu: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", t2, "File upload successfully!");
      }
      if (this.selectS == 'Phy') {
        var t3 = { Phy: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", t3, "File upload successfully!");
      }
      else if (this.selectS == 'Che') {
        var t4 = { Che: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", t4, "File upload successfully!");
      }
      if (this.selectS == 'Isl') {
        var t5 = { Isl: this.filesave };
        this.uploadWork("class" + this.callProfile.class + "s", t5, "File upload successfully!");
      }
    }
  }

  uploadHome() {
    console.log("from button submit:", this.filesave);
    this.selectSubject();
  }

  submitQuiz() {
    console.log(this.score);
    var task = {
      QuizScore: this.score
    };
    this.uploadWork("result-class" + this.callProfile.class + "s", task, "Quiz uploaded successfully!");
  }
}
