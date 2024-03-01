import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@cores/utils/common-functions';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
    canMatch: [AuthGuard],
  },
  {
    path: 'page',
    loadChildren: () => import('./my-page/my-page.module').then((m) => m.MyPageModule),
  },
  {
    path:'auth',
    loadChildren:()=>import('./shared/auth/auth.module').then((m)=>m.AuthModule)
  },
  { path: '', redirectTo: 'page/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'page/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
