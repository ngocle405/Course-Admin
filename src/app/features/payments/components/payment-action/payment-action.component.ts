import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { find } from 'lodash';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'app-payment-action',
  templateUrl: './payment-action.component.html',
  styleUrls: ['./payment-action.component.scss']
})
export class PaymentActionComponent extends BaseActionComponent implements OnInit {

  constructor(inject: Injector, service: PaymentService) {
    super(inject, service);
  }
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
   
    }
    else if (this.screenType === ScreenType.Update) {
      this.form?.get('studentId')!.disable();
      
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.form.patchValue(this.data);//dùng cho sửa,detail
    }
  }
  
  override form = this.fb!.group({
    studentId: ['', Validators.required],
    money: ['', Validators.required],
    statusPayment: [true, Validators.required],
    contentPayment: ['']
  })
  price: number = 0;
  

  // onChangUser() {
  //   this.price = this.state?.listStudent.find((x:any) => x.price).price;
  //   console.log(this.price)
  // }

}
