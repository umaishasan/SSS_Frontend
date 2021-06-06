import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckAnnoucementPageRoutingModule } from './check-annoucement-routing.module';

import { CheckAnnoucementPage } from './check-annoucement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckAnnoucementPageRoutingModule
  ],
  declarations: [CheckAnnoucementPage]
})
export class CheckAnnoucementPageModule {}
