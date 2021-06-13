import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NetworkService } from '../service/network.service';

interface Classs {
  class: string,
  name: string,
  link: string
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  elementType: 'Teacher' | 'Student' = "Teacher";
  selectedVal: any;
  classs: Classs[] = [
    { class: "class1s", name: "Class1", link: '/show-studentatten' }, { class: "class2s", name: "Class2", link: '/show-studentatten' },
    { class: "class3s", name: "Class3", link: '/show-studentatten' }, { class: "class4s", name: "Class4", link: '/show-studentatten' },
    { class: "class5s", name: "Class5", link: '/show-studentatten' }, { class: "class6s", name: "Class6", link: '/show-studentatten' },
    { class: "class7s", name: "Class7", link: '/show-studentatten' }, { class: "class8s", name: "Class8", link: '/show-studentatten' },
    { class: "class9s", name: "Class9", link: '/show-studentatten' }, { class: "class10s", name: "Class10", link: '/show-studentatten' }
  ];
  className: any;
  saveSelectedval: any;
  saveSelectedvalById: any;

  constructor(public navCtrl: NavController,public network: NetworkService) {
    this.segmentChanged(this.elementType);
  }

  segmentChanged(event) {
    console.log("Segment change", event);
  }


  ngOnInit() { }

  classSelect(event) {
    var param = [];
    this.selectedVal = event.detail.value;
    console.log("selected class value: ",this.selectedVal);
    for(let i=0;i<this.classs.length;i++){
      if(this.selectedVal == this.classs[i].class){
        this.className = this.classs[i].name;
      }
    }
    this.network.getSpecificDataforAttendance(this.selectedVal, this.elementType).then(data => {
      this.saveSelectedval = data;
      for (let i = 0; i < this.saveSelectedval.length; i++) {
        this.saveSelectedvalById = this.saveSelectedval[i];
        var task = {name: this.saveSelectedvalById.name, attendance: this.saveSelectedvalById.Attendance};
        param.push(task);
        var cl = this.className;
        this.navCtrl.navigateForward('/show-studentatten', { state: { param, cl } });
      }
    });
  }

}
