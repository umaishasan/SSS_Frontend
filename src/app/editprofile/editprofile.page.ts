import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  slctCate: string;
  id: number;
  phone: number;
  email: string;
  pass: string;

  dataa: any;

  constructor(public network: NetworkService,public toast: ToastedService,public saveData: ForSaveService) {
    this.dataa = this.saveData.dataSave
    this.id = this.dataa.id;
    console.log("call from edit profile",this.id);
   }

  ngOnInit() { }

  update(){
    var task = {
      email: this.email,
      phone: this.phone,
      password: this.pass
    };
    this.network.putDataById(this.slctCate,this.id,task).then(data =>{
      console.log(data);
    });
    this.toast.showToast('Profile update successfully!')
  }
}
