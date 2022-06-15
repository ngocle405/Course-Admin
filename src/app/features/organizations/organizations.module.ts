import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrganizationsRoutingModule } from './organizations-routing.module';

@NgModule({
  imports: [OrganizationsRoutingModule, SharedModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [],
})
export class OrganizationsModule {}
