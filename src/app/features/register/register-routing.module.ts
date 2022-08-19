import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterListComponent } from "./pages/register-list/register-list.component";


const routes: Routes = [
    {
      path: '',
      component: RegisterListComponent,
    },
   
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class RegisterRoutingModule{}