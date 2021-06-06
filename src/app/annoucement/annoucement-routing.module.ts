import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnoucementPage } from './annoucement.page';

const routes: Routes = [
  {
    path: '',
    component: AnnoucementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnoucementPageRoutingModule {}
