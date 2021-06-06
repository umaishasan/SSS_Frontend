import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectItemsPageRoutingModule } from './select-items-routing.module';

import { SelectItemsPage } from './select-items.page';
import { ParentsPage } from '../parents/parents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectItemsPageRoutingModule
  ],
  declarations: [SelectItemsPage],
  providers: [ParentsPage]
})
export class SelectItemsPageModule {}
