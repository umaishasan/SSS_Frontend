import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildsPageRoutingModule } from './childs-routing.module';

import { ChildsPage } from './childs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildsPageRoutingModule
  ],
  declarations: [ChildsPage]
})
export class ChildsPageModule {}
