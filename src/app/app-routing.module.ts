import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './core/services/guard.service';
import { LoginComponent } from '@shared/login/login.component';
import { AuthGuard } from '@cores/services/auth-login.service';

const routes: Routes = [
  {
    path: 'mb-ageas',
    loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
    canActivate: [GuardService],
    
  },
  {
    path: 'login',
    component:LoginComponent
  },
  { path: '', redirectTo: 'mb-ageas', pathMatch: 'full' },
  { path: '**', redirectTo: 'mb-ageas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
