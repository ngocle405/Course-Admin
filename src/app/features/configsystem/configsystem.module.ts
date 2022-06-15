import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ConfigSystemRoutingModule } from './configsystem-routing.module';
import { pages } from './pages';
import { components } from './components';




@NgModule({
  declarations: [
   ...pages,...components
  ],
  imports: [
    SharedModule,ConfigSystemRoutingModule
  ]
})
export class ConfigSystemModule { }
