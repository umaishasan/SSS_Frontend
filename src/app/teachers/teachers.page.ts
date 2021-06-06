import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {
  datas: any;

  constructor(public saveData: ForSaveService) {
    this.datas = this.saveData.dataSave;
  }

  ngOnInit() { }

}
