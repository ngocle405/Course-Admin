import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { pages } from './pages';
import { components } from './components';




@NgModule({
  declarations: [
    ...pages,...components
  ],
  imports: [
    SharedModule,PaymentRoutingModule
  ]
})
export class PaymentsModule { }
