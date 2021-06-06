import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherUploadWorkPageRoutingModule } from './teacher-upload-work-routing.module';

import { TeacherUploadWorkPage } from './teacher-upload-work.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherUploadWorkPageRoutingModule
  ],
  declarations: [TeacherUploadWorkPage]
})
export class TeacherUploadWorkPageModule {}
