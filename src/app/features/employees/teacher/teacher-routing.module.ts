import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeacherListComponent } from "./pages";

const routes: Routes = [
    {
      path: '',
      component: TeacherListComponent,
    },
  
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class TeacherRoutingModule{}