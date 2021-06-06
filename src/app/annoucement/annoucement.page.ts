import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.page.html',
  styleUrls: ['./annoucement.page.scss'],
})
export class AnnoucementPage implements OnInit {
  annoucement:string;
  constructor(public network: NetworkService) { }

  ngOnInit() {  }

  goToAnnoucement(){
    var task = {
      id: 1,
      annoucement: this.annoucement
    };
    this.network.putData('annoucements',1,task).then(data =>{
      console.log(data);
    });
  }

}
