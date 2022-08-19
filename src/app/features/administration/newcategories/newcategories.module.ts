import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { components } from './components';
import { NewCategoryRoutingModule } from './newcategories-routing.module';
import { pages } from './pages';

@NgModule({
  declarations: [
  ...pages,...components
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NewCategoryRoutingModule
  ]
})
export class NewcategoryModule { }
