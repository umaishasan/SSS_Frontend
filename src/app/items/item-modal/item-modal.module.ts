import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemModalPageRoutingModule } from './item-modal-routing.module';

import { ItemModalPage } from './item-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ItemModalPageRoutingModule
  ],
  declarations: [ItemModalPage]
})
export class ItemModalPageModule {}
