import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeClasssPage } from './make-classs.page';

const routes: Routes = [
  {
    path: '',
    component: MakeClasssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeClasssPageRoutingModule {}
