import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentListComponent } from "./pages";

const routes: Routes = [
    {
      path: '',
      component: StudentListComponent,
    },
  
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class StudentRoutingModule{}