import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherCreaterPage } from './voucher-creater.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherCreaterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherCreaterPageRoutingModule {}
