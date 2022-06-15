import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';
import { ConfigSystemService } from '../../service/config-system.service';

@Component({
  selector: 'app-configsystem-action',
  templateUrl: './config-system-action.component.html',
  styleUrls: ['./config-system-action.component.scss']
})
export class ConfigsystemActionComponent extends BaseActionComponent implements OnInit {
  hiddenImage: boolean=false;

  constructor(inject:Injector,service:ConfigSystemService) {
    super(inject,service);
  }
   override form = this.fb!.group({
          address:['',Validators.required],
          phone:['',Validators.required],
          hotline1:['',Validators.required],
          hotline2:['',Validators.required],
          description:[''],
          titleDefault:['',Validators.required],
          status:true,
          information:['']
   })
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
      this.hiddenImage=true;
    }
    else if (this.screenType === ScreenType.Update) {
      
      this.hiddenImage=true;
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.form.patchValue(this.data);//dùng cho sửa,detail
      
    }
  }

}
