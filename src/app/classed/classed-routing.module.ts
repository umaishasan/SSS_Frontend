import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassedPage } from './classed.page';

const routes: Routes = [
  {
    path: '',
    component: ClassedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassedPageRoutingModule {}
