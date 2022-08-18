import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCategoryListComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: CourseCategoryListComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseCategoryRoutingModule {}
