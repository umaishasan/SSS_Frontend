import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPage2PageRoutingModule } from './scanner-page2-routing.module';

import { ScannerPage2Page } from './scanner-page2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPage2PageRoutingModule
  ],
  declarations: [ScannerPage2Page]
})
export class ScannerPage2PageModule {}
