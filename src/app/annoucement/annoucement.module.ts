import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnoucementPageRoutingModule } from './annoucement-routing.module';

import { AnnoucementPage } from './annoucement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnoucementPageRoutingModule
  ],
  declarations: [AnnoucementPage]
})
export class AnnoucementPageModule {}
