import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildsPage } from './childs.page';

const routes: Routes = [
  {
    path: '',
    component: ChildsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildsPageRoutingModule {}
