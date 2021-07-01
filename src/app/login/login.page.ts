import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
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
  email: string;
  pass: string;
  datasforAll: any;
  datasforAll2: any;
  forAll: any;
  datasforStu: any;
  forStu: any;
  passwordTogleIcon: 'eye' | 'eye-off' = 'eye';
  showPassword: boolean = false;
  backButtonSubscription;

  scanned = null;
  studentData: any;
  studentDataById: any;
  //for send deta
  forHome: any;
  forQuiz: any;
  forResult: any;

  constructor(
     private route: Router,
     private saveData: ForSaveService, 
     private platform: Platform, 
     private toas: ToastedService, 
     private network: NetworkService, 
     private mnuCtrl: MenuController,
     private appComp: AppComponent,
     private barcodeScanner: BarcodeScanner) {
    this.mnuCtrl.enable(false);
    this.network.getData("all-users").then(data => {
      console.log(data);
    });
    this.network.getData('students').then(data => {
      this.studentData = data;
      console.log(this.studentData);
    });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    let a = 0;
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      a++;
      if (a == 2) {
        navigator['app'].exitApp();
      }
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  passwordTogle() {
    this.showPassword = !this.showPassword;
    if (this.passwordTogleIcon == 'eye') {
      this.passwordTogleIcon = 'eye-off';
    }
    else {
      this.passwordTogleIcon = 'eye';
    }
  }

  login() {
    this.network.loginData("all-users", this.email).then(data => {
      this.datasforAll = data;
      console.log(this.datasforAll);
      console.log(this.datasforAll.email);
      if (this.email == this.datasforAll.email && this.pass == this.datasforAll.password) {
        console.log(this.datasforAll.name);
        this.route.navigateByUrl('/' + this.datasforAll.user);
        this.mnuCtrl.enable(true);
        this.jumpPage(this.datasforAll.user + 'Page');
        this.saveData.ema = this.datasforAll.email;
        this.appComp.username = this.datasforAll.name;
      }
      else{
        this.toas.alertMessage("Login Error","Incorrest Email or Password!");
      }
    });
  }

  jumpPage(pageCall) {
      if (pageCall == 'adminsPage') {
        pageCall = [
          { title: 'Home', url: '/admins', icon: 'home' },
          { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
          { title: 'Registration', url: '/registeration', icon: 'person-add' },
          { title: 'Generate Card', url: '/generate-card', icon: 'id-card' },
          { title: 'Make Classes', url: '/make-classs', icon: 'build' },
          { title: 'Announcement', url: '/annoucement', icon: 'megaphone' },
          { title: 'Attendance', url: '/attendance', icon: 'hand-left' },
          { title: 'Voucher Create', url: '/voucher-creater', icon: 'document' },
        ];
        this.appComp.appPages = pageCall;
      }
      else if (pageCall == 'canteensPage') {
        pageCall = [
          { title: 'Home', url: '/canteens', icon: 'home' },
          { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
          { title: 'Items', url: '/items', icon: 'cart' },
          { title: 'Wallet', url: '/wallet', icon: 'wallet' },
          { title: 'Item sell', url: '/scanner-page2', icon: 'basket' }
        ];
        this.appComp.appPages = pageCall;
      }
      else if (pageCall == 'parentsPage') {
        pageCall = [
          { title: 'Home', url: '/parents', icon: 'home' },
          { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
          { title: 'Select Items', url: '/select-items', icon: 'list' },
          { title: 'Voucher', url: '/voucher', icon: 'document' },
          { title: 'Wallet', url: '/walletp', icon: 'wallet' },
          { title: 'Results', url: '/resultp', icon: 'medal' },
          { title: 'Childs', url: '/childs', icon: 'people' },
          { title: 'Dairy', url: '/dairy', icon: 'clipboard' }
        ];
        this.appComp.appPages = pageCall;
      }
      else if (pageCall == 'teachersPage') {
        pageCall = [
          { title: 'Home', url: '/teachers', icon: 'home' },
          { title: 'Edit Profile', url: '/editprofile', icon: 'create' },
          { title: 'Class', url: '/teacher-upload-work', icon: 'book' },
          { title: 'Announcement', url: '/check-annoucement', icon: 'megaphone' },
          { title: 'Attendance', url: '/attendancet', icon: 'hand-left' },
        ];
        this.appComp.appPages = pageCall;
      }
      else if(pageCall == 'studentPage'){
        pageCall = [
          { title: 'Home', url: '/student', icon: 'home' },
          { title: 'Class', url: '/classed', icon: 'book' }
        ];
        this.appComp.appPages = pageCall;
      }
  }

  HomeclassCall(ids) {
    this.network.getData("class" + ids + "s").then(data => {
      this.forHome = data;
      for (let i = 0; i < this.forHome.length; i++) {
        if (this.forHome[i].user == "teachers") {
          this.saveData.homeWork.push(this.forHome[i]);
        }
      }
    });
  }

  QuizclassCall(ids) {
    this.network.getData("quiz-class" + ids + "s").then(data => {
      this.forQuiz = data;
      this.saveData.quizWork = this.forQuiz;
    });
  }

  ResultclassCall(ids, idd) {
    this.network.getData("result-class" + ids + "s").then(data => {
      this.forResult = data;
      for (let i = 0; i < this.forResult.length; i++) {
        if (this.forResult[i].Id == idd) {
          this.saveData.resultWork = this.forResult[i];
          console.log(this.saveData.resultWork);
        }
      }
    });
  }

  scanCode() {
    // this.barcodeScanner.scan().then(code => {
    //   this.scanned = code.text;
      for (let i = 0; i < this.studentData.length; i++) {
        this.studentDataById = this.studentData[i];
        if (this.email === this.studentDataById.qrString) {
          this.route.navigateByUrl('/student');
          this.mnuCtrl.enable(true);
          this.jumpPage('studentPage');
          this.appComp.username = this.studentDataById.username;
          this.saveData.ForStuDataSave = this.studentDataById;
          this.HomeclassCall(this.studentDataById.class);
          this.QuizclassCall(this.studentDataById.class);
          this.ResultclassCall(this.studentDataById.class,this.studentDataById.id+'s');
        }
      }
    // });
  }

}
