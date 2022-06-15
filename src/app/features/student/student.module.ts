import { NgModule } from '@angular/core';

import { pages } from './pages';
import { components } from './components';
import { SharedModule } from '@shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';




@NgModule({
  declarations: [
    ...pages,
    ...components
  ],
  imports: [
    SharedModule,StudentRoutingModule
  ]
})
export class StudentModule { }
