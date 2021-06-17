import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultpPageRoutingModule } from './resultp-routing.module';

import { ResultpPage } from './resultp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultpPageRoutingModule
  ],
  declarations: [ResultpPage]
})
export class ResultpPageModule {}
