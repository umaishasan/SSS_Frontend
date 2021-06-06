import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit {
  datas: any;

  constructor(public saveData: ForSaveService) { 
    this.datas = this.saveData.dataSave;
  }

  ngOnInit() {
  }

}
