import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { AuthGuard } from '@cores/services/auth-login.service';

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
        path: 'employee',
        loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeesModule),
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
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // },
     //  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
