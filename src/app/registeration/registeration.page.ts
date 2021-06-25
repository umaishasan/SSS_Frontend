import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Calss{
  id: number,
  name: string
}
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
  selectclass: any;
  selectsection: any;
  canvasImg: any;
  clas: Calss[] = [{id: 1,name: 'Class1'},{id: 2,name: 'Class2'},{id: 3,name: 'Class3'},{id: 4,name: 'Class4'},{id: 5,name: 'Class5'},
  {id: 6,name: 'Class6'},{id: 7,name: 'Class7'},{id: 8,name: 'Class8'},{id: 9,name: 'Class9'},{id: 10,name: 'Class10'},]

  RegisterFormStu: FormGroup;
  RegisterFormAll: FormGroup;

  constructor(private network: NetworkService, private toast: ToastedService) {
    this.network.getData('parents').then(data => {
      console.log(data);
      this.AllParent = data;
    });
    this.RegisterFormStu = new FormGroup({
      Name: new FormControl('', Validators.required),
      Age: new FormControl('', Validators.required),
      SelectGender: new FormControl(null, Validators.required),
      SelectClass: new FormControl(null, Validators.required),
      SelectSection: new FormControl(null, Validators.required),
      SelectParent: new FormControl(null, Validators.required)
    });

    this.RegisterFormAll = new FormGroup({
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      Phone: new FormControl('', Validators.required),
      SelectGender: new FormControl(null, Validators.required),
      Password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      ConfirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }

  postData(tableName, task, message) {
    this.network.postDataForRegistration(tableName, task,'Registration Error','Please try again!').then(data => {
      console.log(data);
      this.toast.loadControlDismiss();
      this.toast.showToast(message);
    });
  }

  prnts() {
    console.log(this.selectParent);
    for (let i = 0; i < this.AllParent.length; i++) {
      if (this.selectParent == this.AllParent[i].id) {
        this.parentID = this.AllParent[i];
      }
    }
    console.log(this.parentID.id,this.parentID.name);
    var task = {
      username: this.name,
      parentNAME: this.parentID.name,
      parentID: this.parentID.id,
      gender: this.Selectgender,
      age: this.age,
      class: parseInt(this.selectclass),
      section: this.selectsection,
      studentsPic: this.canvasImg,
      ItemAmount: 0
    };
    console.log(task);
    this.network.postDataForRegistration("students", task,'Registration Error','Please try again!').then(data => {
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
    var combine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-|}]{[';:/?.>,<~`0123456789";
    var stringLength = combine.length;
    var result = '';
    for (var i = 0; i < 15; i++) {
      result += combine.charAt(Math.floor(Math.random() * stringLength));
    }
    this.qrData = result + id;
  }

  submit() {
    this.toast.loadControlShow(5000);
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
      var sk = { email: this.email, password: this.pass, user: this.selctUsr, name: this.name };
      this.postData(this.selctUsr, ta, "Successfully Registered!");
      this.postData("all-users", sk, "Successfully Registered!");
    } else if (this.selctUsr == 'canteens') {
      var ts = {
        name: this.name,
        gender: this.Selectgender,
        email: this.email,
        phone: this.phone,
        password: this.pass,
        wallet: 0
      };
      var sk = { email: this.email, password: this.pass, user: this.selctUsr, name: this.name };
      this.postData(this.selctUsr, ts, "Successfully Registered!");
      this.postData("all-users", sk, "Successfully Registered!");
    } else {
      var tk = {
        name: this.name,
        gender: this.Selectgender,
        email: this.email,
        phone: this.phone,
        password: this.pass
      };
      var sk = { email: this.email, password: this.pass, user: this.selctUsr, name: this.name };
      this.postData(this.selctUsr, tk, "Successfully Registered!");
      this.postData("all-users", sk, "Successfully Registered!");
    }
  }

  submitStudent() {
    this.toast.loadControlShow(5000);
    for (let i = 0; i < this.studentRegisterd.length; i++) {
      console.log(this.studentRegisterd[i]);
      console.log(this.studentRegisterd[i].id, this.studentRegisterd[i].username);
      this.generateQRCode(this.studentRegisterd[i].id);
      var taskk = { qrString: this.qrData };
      this.network.putDataById("students", this.studentRegisterd[i].id, taskk,'Uploading Error','Please try again!').then(data => {
        console.log(data);
        this.toast.loadControlDismiss();
        this.toast.showToast('Successfully Registered!');
      });
    }
  }

  checkCnfrmPass(event) {
    event = this.pass;
    if (this.cpass === event) {
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
