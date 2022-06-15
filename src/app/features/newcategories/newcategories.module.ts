import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewcategoryActionComponent } from './components';
import { NewCategoryRoutingModule } from './newcategories-routing.module';
import { NewcategoryListComponent } from './pages';

@NgModule({
  declarations: [
    NewcategoryListComponent,
    NewcategoryActionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NewCategoryRoutingModule
  ]
})
export class NewcategoryModule { }
