import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-make-classs',
  templateUrl: './make-classs.page.html',
  styleUrls: ['./make-classs.page.scss'],
})
export class MakeClasssPage implements OnInit {
  id:number;
  name: string;
  selectU:string;
  selectC: any;
  classes: any[] = ["class1s","class2s","class3s","class4s","class5s","class6s","class7s","class8s","class9s","class10s"];

  constructor(public network:NetworkService,public toast:ToastedService) {
   }

  ngOnInit() { }

  submit(){
    var task = {
      id: this.id,
      name: this.name,
      user: this.selectU
    };
    this.network.postData(this.selectC,task).then(data =>{
      console.log(data);
    });
    this.toast.showToast('Successfully added');
  }

  remove(){
    this.network.delData(this.selectC,this.id).then(data =>{
      console.log(data);
    });
    this.toast.showToast('Successfully removed');
  }

}
