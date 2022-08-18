import { NgModule } from '@angular/core';
import { components } from './components';
import { pages } from './pages';
import { SharedModule } from '@shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [
    ...components,
    ...pages

  ],
  imports: [
    SharedModule,CourseRoutingModule
  ]
})
export class CourseModule { }
