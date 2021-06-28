import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancetPage } from './attendancet.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancetPageRoutingModule {}
