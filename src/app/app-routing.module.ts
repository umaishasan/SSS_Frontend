import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admins',
    loadChildren: () => import('./admins/admins.module').then( m => m.AdminsPageModule)
  },
  {
    path: 'annoucement',
    loadChildren: () => import('./annoucement/annoucement.module').then( m => m.AnnoucementPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'canteens',
    loadChildren: () => import('./canteens/canteens.module').then( m => m.CanteensPageModule)
  },
  {
    path: 'check-annoucement',
    loadChildren: () => import('./check-annoucement/check-annoucement.module').then( m => m.CheckAnnoucementPageModule)
  },
  {
    path: 'classed',
    loadChildren: () => import('./classed/classed.module').then( m => m.ClassedPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'generate-card',
    loadChildren: () => import('./generate-card/generate-card.module').then( m => m.GenerateCardPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'make-classs',
    loadChildren: () => import('./make-classs/make-classs.module').then( m => m.MakeClasssPageModule)
  },
  {
    path: 'parents',
    loadChildren: () => import('./parents/parents.module').then( m => m.ParentsPageModule)
  },
  {
    path: 'registeration',
    loadChildren: () => import('./registeration/registeration.module').then( m => m.RegisterationPageModule)
  },
  {
    path: 'scanner-page2',
    loadChildren: () => import('./scanner-page2/scanner-page2.module').then( m => m.ScannerPage2PageModule)
  },
  {
    path: 'select-items',
    loadChildren: () => import('./select-items/select-items.module').then( m => m.SelectItemsPageModule)
  },
  {
    path: 'show-studentatten',
    loadChildren: () => import('./show-studentatten/show-studentatten.module').then( m => m.ShowStudentattenPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then( m => m.TeachersPageModule)
  },
  {
    path: 'teacher-upload-work',
    loadChildren: () => import('./teacher-upload-work/teacher-upload-work.module').then( m => m.TeacherUploadWorkPageModule)
  },
  {
    path: 'voucher',
    loadChildren: () => import('./voucher/voucher.module').then( m => m.VoucherPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'voucher-creater',
    loadChildren: () => import('./voucher-creater/voucher-creater.module').then( m => m.VoucherCreaterPageModule)
  },
  {
    path: 'walletp',
    loadChildren: () => import('./walletp/walletp.module').then( m => m.WalletpPageModule)
  },
  {
    path: 'resultp',
    loadChildren: () => import('./resultp/resultp.module').then( m => m.ResultpPageModule)
  },
  {
    path: 'childs',
    loadChildren: () => import('./childs/childs.module').then( m => m.ChildsPageModule)
  },
  {
    path: 'dairy',
    loadChildren: () => import('./dairy/dairy.module').then( m => m.DairyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
