import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoadPageService, GuardService } from './core/services/guard.service';
import { LoginComponent } from '@shared/login/login.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
    canActivate: [GuardService],
  },
  {
    path: 'page',
    loadChildren: () => import('./my-page/my-page.module').then((m) => m.MyPageModule),
  },
  {
    path: 'login',
    component:LoginComponent
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: '**', redirectTo: 'page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
