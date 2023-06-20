import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { pages } from './pages';
import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...pages],
  imports: [SharedModule, CourseRoutingModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class CourseModule {}
