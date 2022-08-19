import { NgModule } from '@angular/core';
import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
