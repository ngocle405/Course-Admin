import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewcategoryListComponent } from './pages';



const routes: Routes = [
  {
    path: '',
    component: NewcategoryListComponent,
  },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCategoryRoutingModule {}
