import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'newcategory-list',
        loadChildren: () => import('./newcategories/newcategories.module').then((m) => m.NewcategoryModule),
      },
      {
        path: 'new-list',
        loadChildren: () => import('./news/news.module').then((m) => m.NewsModule),
      },

      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
      },
      {
        path: 'config-system',
        loadChildren: () => import('./configsystem/configsystem.module').then((m) => m.ConfigSystemModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
      },

      {
        path: 'payment',
        loadChildren: () => import('./payments/payments.module').then((m) => m.PaymentsModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
