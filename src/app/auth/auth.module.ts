import { NgModule } from '@angular/core';


import { SharedModule } from '@shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { AuthRoutingModule } from './auth-routing.module';
import {  pages } from './pages';

@NgModule({
  declarations: [
      ...pages
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
    
  ],
})
export class AuthModule { }
