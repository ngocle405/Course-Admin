import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomHttpInterceptor } from './interceptor/custom-http.interceptor';
import { GlobalErrorHandler } from './utils/global-error-handler';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';

export const CORE_PROVIDERS = [
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true,
  },
  Title,
];

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS],
    };
  }
}
