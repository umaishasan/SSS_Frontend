import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-childs',
  templateUrl: './childs.page.html',
  styleUrls: ['./childs.page.scss'],
})
export class ChildsPage implements OnInit {
  idCall: any;
  datasF: any;

  constructor(private network: NetworkService,private saveData: ForSaveService) {
    this.idCall = this.saveData.pid;
    this.network.getSpecificDataforFather('students', this.idCall).then(data => {
      this.datasF = data;
      console.log(this.datasF);
    });
  }

  ngOnInit() {
  }

}
