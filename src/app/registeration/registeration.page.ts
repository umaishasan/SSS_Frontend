import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.page.html',
  styleUrls: ['./registeration.page.scss'],
})
export class RegisterationPage implements OnInit {
  //for all
  email: string;
  phone: number;
  pass: string;
  cpass: string;

  //for common
  name: string;
  Selectgender: string;
  selctUsr: string;
  ShowPassword: boolean = false;
  passwordToggleIcon: 'eye' | 'eye-off' = 'eye';

  //for stu
  age: number;
  selectParent: any;
  AllParent: any;
  parentID: any;
  studentRegisterd = [];
  studentID: any[] = [];
  studentName: any[] = [];
  qrData: string;
  class: string;
  section: string;
  canvasImg: any;

  constructor(private network: NetworkService, private toast: ToastedService) {
    this.network.getData('parents').then(data =>{
      console.log(data);
      this.AllParent = data;
    });
  }

  postData(tableName, task, messageHeader, message) {
    this.network.postDataForRegistration(tableName, task).then(data => {
      console.log(data);
      this.toast.showToast(message);
    }).catch(e => {
      this.toast.alertMessage(messageHeader, e)
    });
  }

  ngOnInit() { }

  prnts() {
    console.log(this.selectParent);
    for (let i = 0; i < this.AllParent.length; i++) {
      if (this.selectParent == this.AllParent[i].id) {
        this.parentID = this.AllParent[i];
      }
    }
    var task = {
      username: this.name,
      parentNAME: this.parentID.name,
      parentID: this.parentID.id,
      gender: this.Selectgender,
      age: this.age,
      class: this.class,
      section: this.section,
      studentsPic: this.canvasImg,
      ItemAmount: 0
    };
    this.network.postDataForRegistration("students", task).then(data => {
      this.studentRegisterd.push(data);
      console.log(this.studentRegisterd);
    });
  }

  loadImageFromDevice(event) {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var eventFile = event.target.files[0];
    var reader = new FileReader();
    var img = new Image(100, 100);
    reader.readAsDataURL(eventFile);
    reader.onload = () => {
      var result = reader.result.toString();
      console.log(result);
      img.src = result;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 100, 100);
        console.log(canvas.toDataURL(), canvas.width, canvas.height);
        this.canvasImg = canvas.toDataURL();
      }
    };
  }

  userSelect() {
    if (this.selctUsr === 'students') {
      document.getElementById('forStu').style.display = 'block';
      document.getElementById('forAll').style.display = 'none';
    }
    else {
      document.getElementById('forAll').style.display = 'block';
      document.getElementById('forStu').style.display = 'none';
    }
  }

  generateQRCode(id) {
    var combine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-\\|}]{[';:\"/?.>,<~`0123456789";
    var stringLength = combine.length;
    var result = '';
    for (var i = 0; i < 15; i++) {
      result += combine.charAt(Math.floor(Math.random() * stringLength));
    }
    this.qrData = result + id;
  }

  submit() {
    if (this.selctUsr == 'parents') {
      var ta = {
        name: this.name,
        gender: this.Selectgender,
        email: this.email,
        phone: this.phone,
        password: this.pass,
        SaveAmount: 0,
        DeductAmount: 0
      };
      var sk = {email: this.email,password: this.pass,user: this.selctUsr,name: this.name};
      this.postData(this.selctUsr, ta, "Registration Error", "Successfully Registered!");
      this.postData("all-users", sk, "Registration Error", "Successfully Registered!");
    } else if (this.selctUsr == 'canteens') {
      var ts = {
        name: this.name,
        gender: this.Selectgender,
        email: this.email,
        phone: this.phone,
        password: this.pass,
        wallet: 0
      };
      var sk = {email: this.email,password: this.pass,user: this.selctUsr,name: this.name};
      this.postData(this.selctUsr, ts, "Registration Error", "Successfully Registered!");
      this.postData("all-users", sk, "Registration Error", "Successfully Registered!");
    } else {
      var tk = {
        name: this.name,
        gender: this.Selectgender,
        email: this.email,
        phone: this.phone,
        password: this.pass
      };
      var sk = {email: this.email,password: this.pass,user: this.selctUsr,name: this.name};
      this.postData(this.selctUsr, tk, "Registration Error", "Successfully Registered!");
      this.postData("all-users", sk, "Registration Error", "Successfully Registered!");
    }
  }

  submitStudent() {
    for (let i = 0; i < this.studentRegisterd.length; i++) {
      console.log(this.studentRegisterd[i]);
      console.log(this.studentRegisterd[i].id, this.studentRegisterd[i].username);
      this.generateQRCode(this.studentRegisterd[i].id);
      var taskk = { qrString: this.qrData };
      this.network.putDataById("students", this.studentRegisterd[i].id, taskk).then(data => {
        console.log(data);
      });
    }
    this.toast.showToast('Successfully Registered!');
  }

  checkCnfrmPass(event) {
    if (event === this.cpass) {
      document.getElementById('cpass').style.color = 'green';
    }
    else {
      document.getElementById('cpass').style.color = 'red';
    }
  }

  passwordToggle() {
    this.ShowPassword = !this.ShowPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }
    else {
      this.passwordToggleIcon = 'eye';
    }
  }

}
