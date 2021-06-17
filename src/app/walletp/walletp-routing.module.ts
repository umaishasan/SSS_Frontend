import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletpPage } from './walletp.page';

const routes: Routes = [
  {
    path: '',
    component: WalletpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletpPageRoutingModule {}
