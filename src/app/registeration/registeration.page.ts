import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  id: number;
  name: string;
  Selectgender: string;
  selctUsr: string;
  ShowPassword: boolean = false;
  passwordToggleIcon: 'eye' | 'eye-off' = 'eye';

  //for stu
  age: number;
  fatherName: string;
  qrData: string;
  class: string;
  section: string;
  imgString: string;

  constructor(public router: Router, public network: NetworkService, public toast: ToastedService) { }

  ngOnInit() { }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgString = reader.result.toString();
      
    };
    reader.onerror = (error) => {
      console.log(error);
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

  generateQRCode() {
    var combine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-\\|}]{[';:\"/?.>,<~`0123456789";
    var stringLength = combine.length;
    var result = '';
    for (var i = 0; i < 15; i++) {
      result += combine.charAt(Math.floor(Math.random() * stringLength));
    }
    this.qrData = result + this.id;
  }

  submit() {
    var task = {
      id: this.id,
      username: this.name,
      gender: this.Selectgender,
      email: this.email,
      phone: this.phone,
      password: this.pass
    };
    this.network.postDataForRegistration(this.selctUsr, task).then(data => {
      console.log(data);
    }).catch(e => {
      this.toast.alertMessage("Registration Error", "Please fill all the fields.")
    });
    this.toast.showToast('Successfully Registered!');
  }

  submitStudent() {
    this.generateQRCode();
    var task = {
      id: this.id,
      username: this.name,
      fathername: this.fatherName,
      gender: this.Selectgender,
      age: this.age,
      class: this.class,
      section: this.section,
      qrString: this.qrData,
      studentsPic: this.imgString
    };
    this.network.postDataForRegistration(this.selctUsr, task).then(data => {
      console.log(data);
    }).catch(e => {
      this.toast.alertMessage("Registration Error", "Please fill all fields.")
    });
    this.toast.showToast('Successfully Registered!');
    this.router.navigateByUrl('/generate-card');
  }

  checkCnfrmPass() {
    if (this.cpass === this.pass) {
      document.getElementById('cpass').style.color = 'green';
    }
    else {
      document.getElementById('cpass').style.color = 'red';
    }
  }

  passwordToggle() {
    this.ShowPassword = !this.ShowPassword;
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }
    else{
      this.passwordToggleIcon = 'eye';
    }
  }

}
