import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCategoryListComponent } from './pages';



const routes: Routes = [
  {
    path: 'list',
    component: CourseCategoryListComponent,
  },
  {
    path: '',
    redirectTo: 'list',
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseCategoryRoutingModule {}
