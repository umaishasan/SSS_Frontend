import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-studentatten',
  templateUrl: './show-studentatten.page.html',
  styleUrls: ['./show-studentatten.page.scss'],
})
export class ShowStudentattenPage implements OnInit {
  classNmae: any;
  classiName: any;

  constructor(private route: Router) {
    if(this.route.getCurrentNavigation().extras.state){
      const param = this.route.getCurrentNavigation().extras.state;
      this.classNmae = param;
      this.classiName = this.classNmae.cl;
    }
   }

  click() {
    this.route.navigateByUrl('/attendance');
  }

  ngOnInit() { }

}
