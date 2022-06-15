import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { pages } from './pages';

@NgModule({
  imports: [EnterpriseRoutingModule, SharedModule],
  declarations: [...pages],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EnterpriseModule {}
