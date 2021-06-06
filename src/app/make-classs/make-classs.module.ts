import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeClasssPageRoutingModule } from './make-classs-routing.module';

import { MakeClasssPage } from './make-classs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeClasssPageRoutingModule
  ],
  declarations: [MakeClasssPage]
})
export class MakeClasssPageModule {}
