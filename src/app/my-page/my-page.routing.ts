import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { IntroduceComponent } from './introduce-list/introduce.component';

const routes: Routes = [
  {
    path: '',
    component: MyPageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then((m) => m.CourseModule),
      },
      {
        path: 'introduce',
        component:IntroduceComponent
      },
      {
        path: 'new',
        loadChildren: () => import('./new/new.module').then((m) => m.NewModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule {}
