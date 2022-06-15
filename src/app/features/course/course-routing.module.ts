import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseListComponent } from "./pages";

const routes: Routes = [
    {
        path: 'list',
        component: CourseListComponent,
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
export class CourseRoutingModule {

}
