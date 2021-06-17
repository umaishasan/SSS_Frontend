import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultpPage } from './resultp.page';

const routes: Routes = [
  {
    path: '',
    component: ResultpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultpPageRoutingModule {}
