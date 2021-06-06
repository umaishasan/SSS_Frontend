import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';

@Component({
  selector: 'app-canteens',
  templateUrl: './canteens.page.html',
  styleUrls: ['./canteens.page.scss'],
})
export class CanteensPage implements OnInit {
  datas: any;

  constructor(public saveData: ForSaveService) { 
    this.datas = this.saveData.dataSave;
  }

  ngOnInit() {
  }

}
