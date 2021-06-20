import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

interface Claass{
  class: string,
  name: string
}
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
  classes: Claass[] = [
    {class:"class1s",name:"class1"},{class:"class2s",name:"class2"},{class:"class3s",name:"class3"},{class:"class4s",name:"class4"},{class:"class5s",name:"class5"},
    {class:"class6s",name:"class6"},{class:"class7s",name:"class7"},{class:"class8s",name:"class8"},{class:"class9s",name:"class9"},{class:"class10s",name:"class10"}
  ];

  makeClass: FormGroup;

  constructor(private network:NetworkService,private toast:ToastedService) {
    this.makeClass = new FormGroup({
      SelectUser: new FormControl(null,Validators.required),
      Id: new FormControl('',Validators.required),
      Name: new FormControl('',Validators.required),
      SelectClass: new FormControl(null,Validators.required)
    });
  }

  ngOnInit() { }

  submit(){
    var task = {
      id: this.id,
      name: this.name,
      user: this.selectU,
      Attendance: 0
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
