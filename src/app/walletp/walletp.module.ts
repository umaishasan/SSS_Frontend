import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletpPageRoutingModule } from './walletp-routing.module';

import { WalletpPage } from './walletp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletpPageRoutingModule
  ],
  declarations: [WalletpPage]
})
export class WalletpPageModule {}
