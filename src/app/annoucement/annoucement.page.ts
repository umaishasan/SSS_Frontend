import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.page.html',
  styleUrls: ['./annoucement.page.scss'],
})
export class AnnoucementPage implements OnInit {
  annoucement: string;
  tacherCall: any;
  selectTeach: any;
  teachName: any;
  forAnno: boolean = false;
  forSche: boolean = false;

  constructor(private network: NetworkService, private toast: ToastedService) {
    this.network.getData("teachers").then(data => {
      this.tacherCall = data;
      console.log(this.tacherCall);
    });
  }

  ngOnInit() { }

  selectedTeachCall() {
    for (let i = 0; i < this.tacherCall.length; i++) {
      if (this.selectTeach == this.tacherCall[i].id) {
        console.log(this.tacherCall[i]);
        this.teachName = this.tacherCall[i];
      }
    }
    console.log(this.teachName);
  }

  goToAnnoucement() {
    var task = {
      id: 0,
      annoucement: this.annoucement
    };
    this.network.putData('annoucements', 0, task, 'Sending Error', 'Please try again!').then(data => {
      console.log(data);
      this.toast.showToast("Announcement send successfully!");
    });
  }

  goToSchedule() {
    var taskT = {
      AdminAnnouncement: this.annoucement
    };
    this.network.putDataById('teachers', this.teachName.id, taskT, 'Sending Error', 'Please try again!').then(data => {
      console.log(data);
      this.toast.showToast("Schedule announcement send successfully!");
    });
  }

}