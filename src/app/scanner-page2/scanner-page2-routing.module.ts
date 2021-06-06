import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerPage2Page } from './scanner-page2.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerPage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerPage2PageRoutingModule {}
