import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NetworkService } from '../service/network.service';

interface Classs {
  class: string,
  name: string
}
@Component({
  selector: 'app-attendancet',
  templateUrl: './attendancet.page.html',
  styleUrls: ['./attendancet.page.scss'],
})
export class AttendancetPage implements OnInit {
  scanned = null;
  studentData: any;
  attendance: number = 1;
  sClass: any;
  classs: Classs[] = [
    { class: "class1s", name: "Class1" }, { class: "class2s", name: "Class2"},
    { class: "class3s", name: "Class3" }, { class: "class4s", name: "Class4"},
    { class: "class5s", name: "Class5" }, { class: "class6s", name: "Class6"},
    { class: "class7s", name: "Class7" }, { class: "class8s", name: "Class8"},
    { class: "class9s", name: "Class9" }, { class: "class10s", name: "Class10"}
  ];
  studentAttend: any;
  attendView: boolean = false;

  constructor(private barcodeScanner: BarcodeScanner,private network: NetworkService, ) { 
    this.network.getData('students').then(data => {
      this.studentData = data;
      console.log(this.studentData);
    });
  }

  ngOnInit() { }

  studentForAttendance(){
    console.log(this.sClass);
    this.network.getSpecificDataforAttendance(this.sClass,'Student').then(data =>{
      this.studentAttend = data;
      console.log(this.studentAttend);
    });

  }

  scanCode() {
    this.barcodeScanner.scan().then(code => {
      this.scanned = code.text;
      for (let i in this.studentData,this.studentAttend) {
        var att = this.studentAttend[i].id;
        var idAtten = att.split('s');
        console.log(att);
        if (this.scanned == this.studentData[i].qrString && this.studentData[i].id == idAtten[0]){
          console.log(this.studentAttend[i]);
            var task = {
              Attendance: this.studentAttend[i].Attendance += this.attendance
            };
            console.log(task);
            this.network.putDataById(this.sClass, this.studentData[i].id + "s", task, 'Uploading Error', 'Please try again!').then(data => {
              console.log(data);
            });
        }
      }
    });
  }

  viewStuAttend(){
    this.attendView = true;
  }

}
