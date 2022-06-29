import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ClassesRoutingModule } from './classes-routing.module';
import { components } from './components';
import { pages } from './pages/index1';




@NgModule({
  declarations: [
    ...pages,...components
  ],
  imports: [
    SharedModule,
    ClassesRoutingModule
  ]
})
export class ClassesModule { }
