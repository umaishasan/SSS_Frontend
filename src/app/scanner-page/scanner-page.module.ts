import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPagePageRoutingModule } from './scanner-page-routing.module';

import { ScannerPagePage } from './scanner-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPagePageRoutingModule
  ],
  declarations: [ScannerPagePage]
})
export class ScannerPagePageModule {}
