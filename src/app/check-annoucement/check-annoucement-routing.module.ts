import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckAnnoucementPage } from './check-annoucement.page';

const routes: Routes = [
  {
    path: '',
    component: CheckAnnoucementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckAnnoucementPageRoutingModule {}
