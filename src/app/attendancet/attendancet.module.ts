import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancetPageRoutingModule } from './attendancet-routing.module';

import { AttendancetPage } from './attendancet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancetPageRoutingModule
  ],
  declarations: [AttendancetPage]
})
export class AttendancetPageModule {}
