import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { components } from './components';
import { OrganizationChartRoutingModule } from './organization-chart-routing.module';
import { pages } from './pages';

@NgModule({
  imports: [OrganizationChartRoutingModule, SharedModule],
  declarations: [...pages, ...components],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class OrganizationChartModule {}
