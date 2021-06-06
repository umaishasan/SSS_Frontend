import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassedPageRoutingModule } from './classed-routing.module';

import { ClassedPage } from './classed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassedPageRoutingModule
  ],
  declarations: [ClassedPage]
})
export class ClassedPageModule {}
