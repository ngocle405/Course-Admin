import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { find } from 'lodash';
import { PaymentService } from '../../service/payment.service';
import { cleanDataForm, validateAllFormFields } from '@cores/utils/common-functions';

@Component({
  selector: 'app-payment-action',
  templateUrl: './payment-action.component.html',
  styleUrls: ['./payment-action.component.scss']
})
export class PaymentActionComponent extends BaseActionComponent implements OnInit {
  price: number = 0;

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
  
   form = this.fb!.group({
    studentId: ['', Validators.required],
    money: ['', Validators.required],
    statusPayment: [true, Validators.required],
    contentPayment: ['']
  })
   save() {
    if (this.loadingService.loading) {
      return;
    }
    const data = cleanDataForm(this.form);
    if (this.form?.status === 'VALID') {
      this.messageService?.confirm().subscribe((isConfirm) => {
        if (isConfirm) {
          if (this.screenType == ScreenType.Create) {
            this.create(data);
          } else {
            this.update(data);
          }
        }
      });
    } else {
      validateAllFormFields(this.form!);
    }
  }

  // onChangUser() {
  //   this.price = this.state?.listStudent.find((x:any) => x.price).price;
  //   console.log(this.price)
  // }

}
