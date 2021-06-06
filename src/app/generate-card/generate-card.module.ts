import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { IonicModule } from '@ionic/angular';

import { GenerateCardPageRoutingModule } from './generate-card-routing.module';

import { GenerateCardPage } from './generate-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    GenerateCardPageRoutingModule
  ],
  declarations: [GenerateCardPage]
})
export class GenerateCardPageModule {}
