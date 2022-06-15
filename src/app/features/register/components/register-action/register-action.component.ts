import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register-action',
  templateUrl: './register-action.component.html',
  styleUrls: ['./register-action.component.scss']
})
export class RegisterActionComponent extends BaseActionComponent implements OnInit {

  constructor(inject:Injector,service:RegisterService) {
    super(inject,service);
  }
  override form = this.fb!.group({
    name :['',[Validators.required]],
    phone :['',Validators.required],
    email :['',[Validators.email,Validators.required]],
    companyAddress :['',Validators.required],
    courseId :['',Validators.required],
    level :['',Validators.required],
    know :[''],
    
  })
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    this.form.patchValue(this.data);
  }

}
