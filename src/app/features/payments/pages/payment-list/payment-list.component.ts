import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { PaymentActionComponent } from '../../components';
import { PaymentModel } from '../../models/payment.model';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent extends BaseTableComponent<PaymentModel> implements OnInit {

  constructor(inject: Injector, service: PaymentService) {
    super(inject, service);
  }
  override params: PaymentModel = {
    searchName: '',
    statusPayment: '',
    courseId: '',
    status: ''
  }
  override mapState(): void {
    this.stateData?.listCourse?.unshift({ courseName: 'Tất cả', courseId: '' });
    this.stateData?.listStatus?.unshift({ name: 'Tất cả', value: '' });
  }
  ngOnInit(): void {
  }
  onReset() {
    this.params = {
      searchName: '',
      statusPayment: '',
      courseId: '',
      status: ''
    }
    this.search();

  }
  override initConfigAction(): void {
    this.configAction={
      title:"",
      component:PaymentActionComponent
    }
  };

}
