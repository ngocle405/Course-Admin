import { NgModule } from '@angular/core';
import { pages } from './pages';
import { components } from './components';
import { SharedModule } from '@shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';

@NgModule({
  declarations: [
    ...pages,
    ...components,
  ],
  imports: [
    SharedModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
