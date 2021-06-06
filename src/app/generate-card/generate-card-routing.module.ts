import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateCardPage } from './generate-card.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateCardPageRoutingModule {}
