import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';
import { CourseCategoryService } from '../../services/course-category.service';

@Component({
  selector: 'app-course-category-action',
  templateUrl: './course-category-action.component.html',
  styleUrls: ['./course-category-action.component.scss']
})
export class CourseCategoryActionComponent extends BaseActionComponent implements OnInit {

  constructor(inject:Injector,service:CourseCategoryService) {
    super(inject,service);
  }
override form = this.fb!.group({
  courseCategoryCode:['',Validators.required],
  courseCategoryName:['',Validators.required],
  description:[''],
  status:true,
})
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    else if (this.screenType === ScreenType.Update) {
      this.form?.get('courseCategoryCode')!.disable();
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.createDate = isEmpty(this.data.createDate) ? null : new Date(this.data.createDate);
      this.form.patchValue(this.data);//dùng cho sửa,detail
    }
  }

}
