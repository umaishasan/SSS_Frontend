import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherUploadWorkPage } from './teacher-upload-work.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherUploadWorkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherUploadWorkPageRoutingModule {}
