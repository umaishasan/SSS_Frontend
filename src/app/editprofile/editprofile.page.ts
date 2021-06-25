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

  constructor(private network: NetworkService,private toast: ToastedService,private saveData: ForSaveService) {
    this.id = this.saveData.pid;
    console.log("call from edit profile",this.id);
   }

  ngOnInit() { }

  update(){
    var task = {
      email: this.email,
      phone: this.phone,
      password: this.pass
    };
    this.network.putDataById("all-users",this.id,task,'Uploading Error','Please try again!').then(data =>{
      console.log(data);
    });
    this.toast.showToast('Profile update successfully!')
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
