import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherCreaterPageRoutingModule } from './voucher-creater-routing.module';

import { VoucherCreaterPage } from './voucher-creater.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherCreaterPageRoutingModule
  ],
  declarations: [VoucherCreaterPage]
})
export class VoucherCreaterPageModule {}
