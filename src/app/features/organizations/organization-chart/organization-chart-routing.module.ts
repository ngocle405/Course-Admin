import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationChartTreeComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: OrganizationChartTreeComponent,
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationChartRoutingModule {}
