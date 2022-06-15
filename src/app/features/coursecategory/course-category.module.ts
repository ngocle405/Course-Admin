import { NgModule } from '@angular/core';
import { pages } from './pages';
import { SharedModule } from '@shared/shared.module';
import { CourseCategoryRoutingModule } from './course-category-routing.module';
import { components } from './components';



@NgModule({
  declarations: [
    ...pages,
    ...components
  ],
  imports: [
    SharedModule,CourseCategoryRoutingModule
  ]
})
export class CoursecategoryModule { }
