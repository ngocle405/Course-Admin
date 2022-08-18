import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';

import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class-action',
  templateUrl: './class-action.component.html',
  styleUrls: ['./class-action.component.scss']
})
export class ClassActionComponent extends BaseActionComponent implements OnInit {

  constructor(inject:Injector,service:ClassService) {
    super(inject,service);
  }
  maxDate= new Date();
  checkEndDate=true;
override form =this.fb!.group({
  className: ['', Validators.required],
  classCode: ['ML-', Validators.required],
  startDate: ['', Validators.required],
  endDate: [''],
  teacherId: ['', Validators.required],
  status:true
})
changStartDate($event:any){
  this.maxDate.setDate(new Date($event).getDate());
  if(this.maxDate !== null){
   this.checkEndDate=false;
  }
}
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    else if (this.screenType === ScreenType.Update) {
      this.form?.get('classCode')!.disable();
    
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.startDate = isEmpty(this.data.startDate) ? null : new Date(this.data.startDate);
      this.data.endDate = isEmpty(this.data.endDate) ? null : new Date(this.data.endDate);
      this.form.patchValue(this.data);//dùng cho sửa,detail

    }
  }
}
