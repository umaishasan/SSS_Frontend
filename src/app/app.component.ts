import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [];
  username:string;
  
  constructor(public router:Router, public mnuCtrl:MenuController) {}

  logout(){
    this.router.navigate(['/login'], { replaceUrl: true });
    this.mnuCtrl.enable(false);
  }
}
