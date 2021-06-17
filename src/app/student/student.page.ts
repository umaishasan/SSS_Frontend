import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  getDataStudent: any;

  constructor(private saveData: ForSaveService) {
    this.getDataStudent = this.saveData.ForStuDataSave;
    console.log("from student class student data:", this.getDataStudent);
  }

  ngOnInit() { }


}
