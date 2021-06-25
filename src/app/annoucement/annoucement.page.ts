import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.page.html',
  styleUrls: ['./annoucement.page.scss'],
})
export class AnnoucementPage implements OnInit {
  annoucement:string;

  constructor(private network: NetworkService,private toast: ToastedService) { }

  ngOnInit() {  }

  goToAnnoucement(){
    var task = {
      id: 1,
      annoucement: this.annoucement
    };
    this.network.putData('annoucements',0,task,'Sending Error','Please try again!').then(data =>{
      console.log(data);
      this.toast.showToast("Announcement send successfully!");
    });
  }

}
