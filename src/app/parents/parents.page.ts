import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {
  datas: any;
  idCall: number;

  constructor(public saveData: ForSaveService) {
    this.datas = this.saveData.dataSave;
    this.idCall = this.datas.id;
    console.log("from parent page: ",this.idCall);
  }

  ngOnInit() { }
  
}
