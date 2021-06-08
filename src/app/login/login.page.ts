import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: number;
  pass: string;
  datas: any;
  slctCate: string;
  passwordTogleIcon: 'eye' | 'eye-off' = 'eye';
  showPassword: boolean = false;

  constructor(public route: Router,public saveData: ForSaveService,public toas: ToastedService,public network: NetworkService,public mnuCtrl: MenuController,public appComp: AppComponent) {
    this.mnuCtrl.enable(false);
  }

  ngOnInit() { }

  passwordTogle(){
    this.showPassword = !this.showPassword;
    if(this.passwordTogleIcon == 'eye'){
      this.passwordTogleIcon = 'eye-off';
    }
    else{
      this.passwordTogleIcon = 'eye';
    }
  }

  login(){
    this.network.loginData(this.slctCate, this.id).then(data => {
      this.datas = data;
      if (this.id == this.datas.id && this.pass == this.datas.password) {
        this.route.navigateByUrl('/'+this.slctCate);
        this.mnuCtrl.enable(true);
        this.jumpPage(this.slctCate+'Page');
        this.appComp.username = this.datas.username;
      }
      else{
        this.toas.alertMessage('Login Error','maybe incorrect username or password and may be you are not user!');
      }
    }).catch(e =>{
      this.toas.alertMessage('Login Error','maybe incorrect username or password and may be you are not user!');
    });
  }

  jumpPage(pageCall){
    if (pageCall == 'adminsPage') {
      pageCall = [
        { title: 'Home', url: '/admins', icon: 'home' },
        { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
        { title: 'Registration', url: '/registeration', icon: 'person-add' },
        { title: 'Generate Card', url: '/generate-card', icon: 'card' },
        { title: 'Make Classes', url: '/make-classs', icon: 'build' },
        { title: 'Annoucement', url: '/annoucement', icon: 'megaphone' },
        { title: 'Attendance', url: '/attendance', icon: 'hand-left' },
        { title: 'Voucher Create', url: '/voucher-creater', icon: 'document' },
      ];
      this.appComp.appPages = pageCall;
      this.saveData.dataSave = this.datas;
    }
    else if (pageCall == 'canteensPage') {
      pageCall = [
        { title: 'Home', url: '/canteens', icon: 'home' },
        { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
        { title: 'Items', url: '/items', icon: 'cart' },
        { title: 'Wallet', url: '/wallet', icon: 'cash' }
      ];
      this.appComp.appPages = pageCall;
      this.saveData.dataSave = this.datas;
    }
    else if (pageCall == 'parentsPage') {
      pageCall = [
        { title: 'Home', url: '/parents', icon: 'home' },
        { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
        { title: 'Student Login', url: '/scanner-page', icon: 'log-in' },
        { title: 'Select Items', url: '/select-items', icon: 'list' },
        { title: 'Voucher', url: '/voucher', icon: 'document' },
      ];
      this.appComp.appPages = pageCall;
      this.saveData.dataSave = this.datas;
    }
    else if (pageCall == 'teachersPage') {
      pageCall = [
        { title: 'Home', url: '/teachers', icon: 'home' },
        { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
        { title: 'Class', url: '/teacher-upload-work', icon: 'book' },
        { title: 'Annoucement', url: '/check-annoucement', icon: 'megaphone' }
      ];
      this.appComp.appPages = pageCall;
      this.saveData.dataSave = this.datas;
    }
  }

}
