import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForSaveService {
  //profile data
  pid: any;
  amount: any;
  ema: any;
  ForStuDataSave: any;

  //students homework/quiz/result data
  homeWork = [];
  quizWork: any;
  resultWork: any;
  
  constructor() { }

}