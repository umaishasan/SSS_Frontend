import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowStudentattenPage } from './show-studentatten.page';

const routes: Routes = [
  {
    path: '',
    component: ShowStudentattenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowStudentattenPageRoutingModule {}
