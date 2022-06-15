import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@cores/services/auth-login.service';
import { GuardService } from './core/services/guard.service';

const routes: Routes = [
  {
    path: 'mb-ageas',
    loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
    canActivate: [GuardService],
    
  },
  {
    path: 'mb-ageas/login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuardService],
  
  },
  { path: '', redirectTo: 'mb-ageas', pathMatch: 'full' },
  { path: '**', redirectTo: 'mb-ageas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
