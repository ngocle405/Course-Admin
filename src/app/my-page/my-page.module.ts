import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MyPageComponent } from './my-page.component';
import { MyPageRoutingModule } from './my-page.routing';
import { RegisterComponent } from './register/register.component';
import { IntroduceComponent } from './introduce-list/introduce.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [MyPageRoutingModule, SharedModule],
  declarations: [MyPageComponent,RegisterComponent,IntroduceComponent,DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MyPageModule {}
