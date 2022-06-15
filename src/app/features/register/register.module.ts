import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { pages } from './pages';
import { components } from './components';





@NgModule({
  declarations: [
    ...pages,
    ...components
  ],
  imports: [
    SharedModule,RegisterRoutingModule
  ]
})
export class RegisterModule { }
