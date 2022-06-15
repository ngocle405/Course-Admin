import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NewListComponent, pages } from './page';
import { NewsRoutingModule } from './news-routing.module';
import { components } from './components';


``
@NgModule({
  declarations: [
    ...pages,
    ...components
   
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
