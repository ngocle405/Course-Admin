import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { components } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { pages } from './pages';
import { SubDashboardComponent } from './pages/sub-dashboard/sub-dashboard.component';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [...pages, ...components, SubDashboardComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DashboardModule {}
