import { Component, Injector, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';
import { FileUpload } from 'primeng/fileupload';
import { fromEvent, map, of as observableOf } from 'rxjs';
import { NewService } from '../../services/new.service';

@Component({
  selector: 'app-new-action',
  templateUrl: './new-action.component.html',
  styleUrls: ['./new-action.component.scss']
})
export class NewActionComponent extends BaseActionComponent implements OnInit {


  constructor(injector: Injector, service: NewService) {
    super(injector, service);
  }

  override form = this.fb!.group({
    //newCategoryId:[''],
    title: ['', Validators.required],
    
    status: true,
    detail:['',Validators.required],
    newCategoryId:[''],
    type:['',Validators.required],
    description:[''],
  });
  hiddenImage:boolean=false;
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
      this.hiddenImage=true;
    }
    else if (this.screenType === ScreenType.Update) {
      this.hiddenImage=true;
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.createDate = isEmpty(this.data.createDate) ? null : new Date(this.data.createDate);
      this.form.patchValue(this.data);//dùng cho sửa,detail
      
    }
  }
}


