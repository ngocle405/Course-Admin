import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'class',
    loadChildren: () => import('./classes/classes.module').then((m) => m.ClassesModule),
  },
  {
    path: 'course-category',
    loadChildren: () => import('./coursecategory/course-category.module').then((m) => m.CoursecategoryModule),
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then((m) => m.CourseModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
