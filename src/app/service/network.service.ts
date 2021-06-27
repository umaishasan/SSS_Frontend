import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastedService } from './toasted.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  baseUrl: string = "";

  constructor(public http: HttpClient,public alrt: ToastedService) {
    this.baseUrl = "https://anda-sss.herokuapp.com/";
    // this.baseUrl = 'http://[::1]:3000/';
  }

  getData(tableName) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + tableName).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getDataById(tableName, id) {
    var table = tableName + '/' + id;
    return new Promise(resolve => {
      this.http.get(this.baseUrl + table).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSpecificData(tableName, value1, columnName1) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][name]=" + value1 + "&filter[fields][" + columnName1 + "]=true").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSpecificDataforTeach(tableName, value1, columnName1) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][id]=" + value1 + "&filter[fields][" + columnName1 + "]=true").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSpecificDataforAttendance(tableName, user) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + tableName + "?filter[where][user]=" + user).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSpecificDataforQuiz(tableName,value){
    return new Promise((resolve,reject) =>{
      this.http.get(this.baseUrl + tableName + "?filter[where][Subject]=" + value).subscribe(data =>{
        resolve(data);
      },err =>{
        reject(err);
        console.log(err);
      });
    });
  }

  getSpecificDataforFather(tableName, fatherId) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + tableName + "?filter[where][parentID]=" + fatherId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getDataForVoucher(tableName,value){
    return new Promise((resolve) =>{
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][id]="+value+"&filter[fields][Voucher]=true").subscribe(data =>{
        resolve(data);
      },err =>{
        console.log(err);
      });
    });
  }

  getDataForWallet(tableName,id,columnName){
    return new Promise((resolve) =>{
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][id]="+id+"&filter[fields][" + columnName + "]=true").subscribe(data =>{
        resolve(data);
      },err =>{
        console.log(err);
      });
    });
  }

  getDataForAnnouncement(tableName,id,columnName){
    return new Promise((resolve) =>{
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][id]="+id+"&filter[fields][" + columnName + "]=true").subscribe(data =>{
        resolve(data);
      },err =>{
        console.log(err);
      });
    });
  }

  getDataForWalletParent(tableName,id,columnName1,columnName2){
    return new Promise((resolve) =>{
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][id]="+id+"&filter[fields][" + columnName1 + "]=true&filter[fields][" + columnName2 + "]=true").subscribe(data =>{
        resolve(data);
      },err =>{
        console.log(err);
      });
    });
  }

  postData(tableName, task,ErrorMessageHeading,ErrorMessage) {
    return new Promise(resolve => {
      this.http.post(this.baseUrl + tableName, task).subscribe(data => {
        resolve(data);
      }, err => {
        this.alrt.alertMessage(ErrorMessageHeading,ErrorMessage);
        console.log(err);
      });
    });
  }

  postDataForRegistration(tableName, task,ErrorMessageHeading,ErrorMessage) {
    return new Promise(resolve => {
      this.http.post(this.baseUrl + tableName, task).subscribe(data => {
        resolve(data);
      }, err => {
        this.alrt.alertMessage(ErrorMessageHeading,ErrorMessage);
        console.log(err);
      });
    });
  }

  putData(tableName, id, task,ErrorMessageHeading,ErrorMessage) {
    var table = tableName + '/' + id;
    return new Promise((resolve) => {
      this.http.put(this.baseUrl + table, task).subscribe(data => {
        resolve(data);
      }, err => {
        this.alrt.alertMessage(ErrorMessageHeading,ErrorMessage);
        console.log(err);
      });
    });
  }

  putDataById(tableName, id, task,ErrorMessageHeading,ErrorMessage) {
    var table = tableName + '/' + id;
    return new Promise((resolve) => {
      this.http.patch(this.baseUrl + table, task).subscribe(data => {
        resolve(data);
      }, err => {
        this.alrt.alertMessage(ErrorMessageHeading,ErrorMessage);
        console.log(err);
      });
    });
  }

  putAllData(tableName, task) {
    return new Promise(resolve => {
      this.http.patch(this.baseUrl + tableName, task).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  delData(tableName, id,ErrorMessageHeading,ErrorMessage) {
    var table = tableName + '/' + id;
    return new Promise((resolve) => {
      this.http.delete(this.baseUrl + table).subscribe(data => {
        resolve(data);
      }, err => {
        this.alrt.alertMessage(ErrorMessageHeading,ErrorMessage);
        console.log(err);
      });
    });
  }

  loginData(tableName,email) {
    var checkUrlid = this.baseUrl + tableName +"/"+email;
    return new Promise((resolve) => {
      this.http.get(checkUrlid).subscribe(data => {
        resolve(data);
      },err =>{
        this.alrt.alertMessage('Login Error',"Incorrest Email or Password!");
        console.log(err);
      });
    });
  }

}
