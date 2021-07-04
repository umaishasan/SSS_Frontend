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
  ShowPassword: boolean = false;
  passwordToggleIcon: 'eye' | 'eye-off' = 'eye';
  dataa: any;
  VeriEmail: any;

  constructor(private network: NetworkService,private toast: ToastedService,private saveData: ForSaveService) {
    this.id = this.saveData.pid;
    this.VeriEmail = this.saveData.ema;
    console.log("call from edit profile",this.id);
   }

  ngOnInit() { }

  update(){
    this.toast.loadControlShow(5000);
    var task = {
      phone: this.phone,
      password: this.pass
    };
    this.network.putDataById(this.slctCate,this.id,task,'Uploading Error','Please try again!').then(data =>{
      console.log(data);
      this.toast.showToast('Profile update successfully!');
    });
    var taskk = {
      password: this.pass
    };
    this.network.putDataById("all-users",this.VeriEmail,taskk,'Uploading Error','Please try again!').then(data =>{
      console.log(data);
      this.toast.showToast('Profile update successfully!');
    });
  }

  passwordToggle(){
    this.ShowPassword = !this.ShowPassword
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }
    else{
      this.passwordToggleIcon = 'eye';
    }
  }
}
