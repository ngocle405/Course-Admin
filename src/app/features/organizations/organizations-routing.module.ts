import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
  },
  {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then((m) => m.BranchModule),
  },
  {
    path: 'title',
    loadChildren: () => import('./title/title.module').then((m) => m.TitleModule),
  },
  {
    path: 'dependent-unit',
    loadChildren: () => import('./dependent-unit/dependent-unit.module').then((m) => m.DependentUnitModule),
  },
  {
    path: 'organization-structure',
    loadChildren: () =>
      import('./organization-structure/organization-structure.module').then((m) => m.OrganizationModule),
  },
  {
    path: 'org-chart-tree',
    loadChildren: () => import('./organization-chart/organization-chart.module').then((m) => m.OrganizationChartModule),
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./enterprise/enterprise.module').then((m) => m.EnterpriseModule),
  },
  {
    path: 'work-location',
    loadChildren: () => import('./work-location/work-location.module').then((m) => m.WorkLocationModule),
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
