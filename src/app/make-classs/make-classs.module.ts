import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeClasssPageRoutingModule } from './make-classs-routing.module';

import { MakeClasssPage } from './make-classs.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MakeClasssPageRoutingModule
  ],
  declarations: [MakeClasssPage]
})
export class MakeClasssPageModule {}
