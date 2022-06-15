import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { components } from './components';
import { OrganizationRoutingModule } from './organization-structure-routing.module';
import { pages } from './pages';

@NgModule({
  imports: [OrganizationRoutingModule, SharedModule],
  declarations: [...pages, ...components],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class OrganizationModule {}
