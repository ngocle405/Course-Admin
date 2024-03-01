import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent,LoginComponent],
  imports: [AuthRoutingModule,SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AuthModule {}

