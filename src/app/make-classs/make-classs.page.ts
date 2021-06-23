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
  selectU:string;
  selectC: any;
  selectN: any;
  classes: Claass[] = [
    {class:"class1s",name:"class1"},{class:"class2s",name:"class2"},{class:"class3s",name:"class3"},{class:"class4s",name:"class4"},{class:"class5s",name:"class5"},
    {class:"class6s",name:"class6"},{class:"class7s",name:"class7"},{class:"class8s",name:"class8"},{class:"class9s",name:"class9"},{class:"class10s",name:"class10"}
  ];
  selectionStu: any;
  selectionTea: any;
  showStu: boolean = false;
  Sn: any;
  Tn: any;
  showTea: boolean = false;
  makeClass: FormGroup;

  constructor(private network:NetworkService,private toast:ToastedService) {
    this.makeClass = new FormGroup({
      SelectUser: new FormControl(null,Validators.required),
      SelectName: new FormControl(null,Validators.required),
      SelectClass: new FormControl(null,Validators.required)
    });
  }

  studentTeacherCall(){
    this.network.getData(this.selectU).then(data =>{
      if(this.selectU === 'students'){
        this.selectionStu = data;
        console.log(this.selectionStu);
        this.showStu = true;
        this.showTea = false;
      }
      else{
        this.selectionTea = data;
        console.log(this.selectionTea);
        this.showStu = false;
        this.showTea = true;
      }
    });
  }

  studentNameCall(){
      for(let i=0;i<this.selectionStu.length;i++){
        if(this.selectionStu[i].id == this.selectN){
          this.Sn = {id:this.selectionStu[i].id,name:this.selectionStu[i].username};
          console.log(this.selectionStu[i].id,this.selectionStu[i].username);
        }}
        console.log(this.Sn);
        console.log(this.Sn.id,this.Sn.name);
  }

  TeacherNameCall(){
      for(let i=0;i<this.selectionTea.length;i++){
        if(this.selectionTea[i].id == this.selectN){
          this.Tn = {id:this.selectionTea[i].id,name:this.selectionTea[i].name};
          console.log(this.selectionTea[i].id,this.selectionTea[i].name);
        }}
        console.log(this.Tn);
        console.log(this.Tn.id,this.Tn.name)
  }

  ngOnInit() { }

  posttData(task){
    this.network.postData(this.selectC,task).then(data =>{
      console.log(data);
      this.toast.showToast('Successfully added');
    });
  }

  deleteData(id){
    this.network.delData(this.selectC,id).then(data =>{
      console.log(data);
      this.toast.showToast('Successfully removed');
    });
  }

  submit(){
    if(this.selectU === 'students'){
        var task = {
          id: this.Sn.id+'s',
          name: this.Sn.name,
          user: this.selectU,
          Attendance: 0
        };
        console.log(task);
        this.posttData(task);
      }
    else{
      var taske = {
        id: this.Tn.id+'t',
        name: this.Tn.name,
        user: this.selectU,
        Attendance: 0
      };
      console.log(taske);
      this.posttData(taske);
    }    
  }

  remove(){
    if(this.selectU === 'students'){
      var ids = this.selectN+"s";
      this.deleteData(ids);
    }
    else{
      var ids = this.selectN+"t";
      this.deleteData(ids);
    } 
  }

}
