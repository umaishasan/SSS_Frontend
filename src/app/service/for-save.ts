import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForSaveService {
  //profile data
  dataSave: any;
  ForStuDataSave: any;

  //students homework/quiz/result data
  homeWork = [];
  quizWork: any;
  resultWork: any;
  
  constructor() { }

}