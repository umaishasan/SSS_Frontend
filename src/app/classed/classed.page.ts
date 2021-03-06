import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { File } from '@ionic-native/file/ngx';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';

interface Subject {
  name: string,
  sub: any
}
@Component({
  selector: 'app-classed',
  templateUrl: './classed.page.html',
  styleUrls: ['./classed.page.scss'],
})
export class ClassedPage implements OnInit {
  @ViewChild('overlapAnimateO', { read: ElementRef }) overlapAnimateO: ElementRef;
  @ViewChild('overlapAnimateU', { read: ElementRef }) overlapAnimateU: ElementRef;
  @ViewChild('overlapAnimateD', { read: ElementRef }) overlapAnimateD: ElementRef;
  arrowToggleiconO: 'chevron-down' | 'chevron-up' = 'chevron-down';
  arrowToggleiconU: 'chevron-down' | 'chevron-up' = 'chevron-down';
  arrowToggleiconD: 'chevron-down' | 'chevron-up' = 'chevron-down';
  elementType: 'home' | 'quiz' | 'result' = "home";
  callProfile: any;
  studentClassData: any;
  homedata: any;
  selectTeacher: any;
  quizdata: any;
  quizdataAnswer: any;
  quizSelectedData: any;
  resultdata: any;
  showSubjectO: boolean = false;
  showSubjectN: boolean = false;
  showSubjectT: boolean = false;
  subjectOE: any[] = ["Eng", "Urdu", "Math", "Sci", "Sst", "Isl", "Draw", "Sindhi"];
  subjectN: any[] = ["Eng", "Urdu", "Math", "Che", "Pst"];
  subjectT: any[] = ["Eng", "Urdu", "Phy", "Che", "Isl"];
  selectS: any;
  subNam: Subject[];
  attendance: number = 1;
  assignment: any;
  filesave: any;
  dirPath: any;
  score: number = 0;
  BufferVal: any;

  constructor(private saveData: ForSaveService, private renderer: Renderer2, private network: NetworkService, private toast: ToastedService, private file: File) {
    this.homedata = this.saveData.homeWork;
    this.quizdata = this.saveData.quizWork;
    console.log(this.quizdata);
    this.resultdata = this.saveData.resultWork;
    this.segmentsChanges(this.elementType);
    this.callProfile = this.saveData.ForStuDataSave;
    console.log(this.callProfile.id + "s", this.callProfile.class);
    this.AccordingtoClassSubjectForHome();
    var arr = [];
    this.network.getDataById("class" + this.callProfile.class + "s", this.callProfile.id + "s").then(data => {
      arr.push(data);
      console.log("From Constructor of dataae: ", arr);
    });
    this.studentClassData = arr;
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
    for (let i = 0; i < this.studentClassData.length; i++) {
      window.open('https://www.zoom.com', '_system', 'location=yes');
      var task = {
        Attendance: this.studentClassData[i].Attendance += this.attendance
      };
      console.log(task);
      this.network.putDataById("class" + this.callProfile.class + "s", this.callProfile.id + "s", task, 'Uploading Error', 'Please try again!').then(data => {
        console.log(data);
      });
    }
  }

  transferrr() {
    this.network.getSpecificData("class" + this.callProfile.class + "s", this.selectTeacher, this.selectS).then(data => {
      this.assignment = data;
      console.log(this.assignment);
      console.log(this.assignment[0]);
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
    this.transferrr();
    this.toast.loadControlShow(5000);
    console.log(this.BufferVal);
    var Uintt = new Uint8Array(this.BufferVal);
    console.log(Uintt);
    var binaryArr = Uintt.buffer;
    console.log(binaryArr);
    var blob = new Blob([binaryArr], { type: 'application/docx' });
    console.log(blob);
    let result = this.file.createDir(this.file.externalDataDirectory, "SchoolHomework", true);
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
      this.toast.alertMessage("Error", "Error: " + error);
    }
  }

  uploadWork(table, task, message) {
    this.network.putDataById(table, this.callProfile.id + "s", task, 'Uploading Error', 'Please try again!').then(data => {
      console.log(data);
      this.toast.loadControlDismiss();
      this.toast.showToast(message);
    });
  }

  uploadWorkForResult(table, task, message) {
    this.network.putDataById(table, this.callProfile.id + 's', task, 'Uploading Error', 'Please try again!').then(data => {
      console.log(data);
      this.toast.loadControlDismiss();
      this.toast.showToast(message);
    });
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
    this.toast.loadControlShow(5000);
    console.log("from button submit:", this.filesave);
    this.selectSubject();
  }

  selectedQuiz() {
    var arr = [];
    for (let i = 0; i < this.quizdata.length; i++) {
      console.log(this.quizdata[i]);
      console.log(this.quizdata[i].QNo);
      if (this.quizdata[i].Subject === this.selectS) {
        arr.push(this.quizdata[i]);
      }
    }
    this.quizSelectedData = arr;
    console.log(this.quizSelectedData);
  }

  submitQuiz() {
    this.toast.loadControlShow(5000);
    console.log(this.score);
    var task = {
      QuizScore: this.score
    };
    this.uploadWorkForResult("result-class" + this.callProfile.class + "s", task, "Quiz uploaded successfully!");
    this.toast.alertMessage("Quiz Score", "Your quiz score is: " + this.score);
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