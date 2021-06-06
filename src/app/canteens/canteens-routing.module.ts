import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanteensPage } from './canteens.page';

const routes: Routes = [
  {
    path: '',
    component: CanteensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanteensPageRoutingModule {}
