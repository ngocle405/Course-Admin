import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-action',
  templateUrl: './teacher-action.component.html',
  styleUrls: ['./teacher-action.component.scss']
})
export class TeacherActionComponent extends BaseActionComponent implements OnInit {
  hiddenImage: boolean=false;

  constructor(inject:Injector,service:TeacherService) {
    super(inject,service);
  }
  override form= this.fb!.group({
     teacherName:['',Validators.required],
     teacherCode:['',Validators.required],
     email:['',[Validators.required,Validators.email]],
     address:['',Validators.required],
     phone:['',Validators.required],
     description:[''],
     gender:1,
     dateOfBirth:['',Validators.required],
     status:true,
     say: [''],
     regular: ['', Validators.required],

  })

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
      this.hiddenImage=true;
    }
    else if (this.screenType === ScreenType.Update) {
     // this.form?.get('teacherCode')!.disable();
      this.hiddenImage=true;
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.dateOfBirth = isEmpty(this.data.dateOfBirth) ? null : new Date(this.data.dateOfBirth);
    
      this.form.patchValue(this.data);//dùng cho sửa,detail
      
    }
  }

}
