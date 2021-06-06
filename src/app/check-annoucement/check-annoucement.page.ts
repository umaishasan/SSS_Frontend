import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-check-annoucement',
  templateUrl: './check-annoucement.page.html',
  styleUrls: ['./check-annoucement.page.scss'],
})
export class CheckAnnoucementPage implements OnInit {
  annouce: any;
  
  constructor(public network: NetworkService) {
    this.network.getData('annoucements').then(data =>{
      this.annouce = data;
    });
  }

  ngOnInit() {
  }

}
