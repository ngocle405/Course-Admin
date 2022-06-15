import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-course-action',
  templateUrl: './course-action.component.html',
  styleUrls: ['./course-action.component.scss']
})
export class CourseActionComponent extends BaseActionComponent implements OnInit {
  hiddenImage: boolean = false;
  maxDate= new Date();
  check=true;
  constructor(inject: Injector, service: CourseService) {
    super(inject, service);
  }
  override form = this.fb!.group({
    courseCategoryId: ['', Validators.required],
    code: ['', Validators.required],
    courseName: ['', Validators.required],
    englishName: ['', Validators.required],
    description: [''],
    countLesson: ['', Validators.required],
    price: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    teacherId: [''],
    status: true,
    note: [''],
    title: ['', Validators.required],
  });

 
  changStartDate($event:any){
    this.maxDate.setDate(new Date($event).getDate());
    if(this.maxDate !== null){
     this.check=false;
    }
  }

  // changEndDate($event:any){
  //   var maxDate=new Date(this.maxDate);

  //   var endDate=new Date($event);
  //   console.log(endDate)
  //   if(endDate>maxDate){
  //     this.messageService!.warn('không thể quá 21 ngày');
  //     return;
  //   }    
  // }
  ngOnInit(): void {

    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
      this.hiddenImage = true;
    }
    else if (this.screenType === ScreenType.Update) {
      this.form?.get('code')!.disable();
      this.hiddenImage = true;
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.createDate = isEmpty(this.data.createDate) ? null : new Date(this.data.createDate);
      this.data.startDate = isEmpty(this.data.startDate) ? null : new Date(this.data.startDate);
      this.data.endDate = isEmpty(this.data.endDate) ? null : new Date(this.data.endDate);
      this.form.patchValue(this.data);//dùng cho sửa,detail

    }
  }

}
