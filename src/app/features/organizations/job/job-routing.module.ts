import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDescriptionListComponent, JobListComponent } from './pages';

const routes: Routes = [
  {
    path: 'list',
    component: JobListComponent,
  },
  {
    path: 'job-description/:id',
    component: JobDescriptionListComponent,
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
export class JobRoutingModule {}
