import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  baseUrl: string = "";

  constructor(public http: HttpClient) {
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

  getDataForVoucher(tableName,value){
    return new Promise((resolve) =>{
      this.http.get(this.baseUrl + tableName + "?filter[where][and][0][id]="+value+"&filter[fields][Voucher]=true").subscribe(data =>{
        resolve(data);
      },err =>{
        console.log(err);
      });
    });
  }

  postData(tableName, task) {
    return new Promise(resolve => {
      this.http.post(this.baseUrl + tableName, task).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  postDataForRegistration(tableName, task) {
    return new Promise((resolve,reject) => {
      this.http.post(this.baseUrl + tableName, task).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
        console.log(err);
      });
    });
  }

  putData(tableName, id, task) {
    var table = tableName + '/' + id;
    return new Promise(resolve => {
      this.http.put(this.baseUrl + table, task).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  putDataById(tableName, id, task) {
    var table = tableName + '/' + id;
    return new Promise(resolve => {
      this.http.patch(this.baseUrl + table, task).subscribe(data => {
        resolve(data);
      }, err => {
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

  delData(tableName, id) {
    var table = tableName + '/' + id;
    return new Promise(resolve => {
      this.http.delete(this.baseUrl + table).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loginData(tableName, id) {
    var checkUrlid = this.baseUrl + tableName + '/' + id;
    return new Promise((resolve,reject) => {
      this.http.get(checkUrlid).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
        console.log(err);
      });
    });
  }

}
