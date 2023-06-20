import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MyPageComponent,
    children: [
        {
            path:'dashboard',
            component:DashboardComponent
        },
        {
          path: 'teacher',
          loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule),
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule {}
