import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from 'src/app/core/utils/enums';
import { isEmpty } from 'lodash';

import { BaseActionComponent } from 'src/app/shared/components/base-action.component';
import { NewcategoryService } from '../../services/newcategory.service';
import { cleanDataForm, validateAllFormFields } from '@cores/utils/common-functions';


@Component({
  selector: 'app-newcategory-action',
  templateUrl: './newcategory-action.component.html',
  styleUrls:['./newcategory-action.component.scss'],

})
export class NewcategoryActionComponent extends BaseActionComponent implements OnInit {

  constructor(injector:Injector,service:NewcategoryService) {
    super(injector,service);
  }
   form = this.fb!.group({
    //newCategoryId:[''],
    newCategoryCode:['',Validators.required],
    newCategoryName:['',Validators.required],
    status:true
  });
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
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    else if (this.screenType === ScreenType.Update) {
      this.form?.get('newCategoryCode')!.disable();
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.createDate = isEmpty(this.data.createDate) ? null : new Date(this.data.createDate);
      this.form.patchValue(this.data);//dùng cho sửa,detail
    }
  }

}
