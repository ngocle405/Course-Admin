import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigSystemListComponent } from "./pages";


const routes: Routes = [
    {
        path: '',
        component: ConfigSystemListComponent,
    },
   
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfigSystemRoutingModule {

}
