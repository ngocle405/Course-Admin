import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { BaseActionComponent } from '@shared/components';
import { ScreenType } from 'src/app/core/utils/enums';
import { BranchModel, StateListModel } from '../../models/branch.model';
import * as _ from 'lodash';


@Component({
  selector: 'app-branch-action',
  templateUrl: './branch-action.component.html',
  styleUrls: ['./branch-action.component.scss'],
})
export class BranchActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: BranchService) {
    super(injector, service);
  }

  city: boolean = false;
 
  listGroupCode: any = [];
 

  list = { provinceCode: '', districtCode: '' };
  override data: BranchModel | undefined;
  override state!: StateListModel;
  override form = this.fb!.group({
    id: [''],
    code: ['', Validators.required],
    t24Code: ['', Validators.required],
    name: ['', Validators.required],
    vietnameseName: [''],
    englishName: [''],
    organizationCode: [''],
    groupCode: [''],
    codeCenter: [''],
    phone: [''],
    fax: [''],
    accountNumber: [''],
    accountName: [''],
    accountBank: [''],
    area: [''],
    vietnameseAddress: [''],
    englishAddress: [''],
    status: true,
    startDate: [''],
    endDate: [''],
    note: [''],
    sortOrder: [''],
    hasUnit: false,
    workLocation: [''],
    inDomestric: ['true'],
    versionCode: [''],
    systemCode: [''],
    address: [''],
    countryCode: [''],
    provinceCode: [''],
    districtCode: [''],
    wardCode: [''],
  });
  form2 = this.fb!.group({
    code: [''],
    name: [''],
  });

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    if (this.data && this.screenType !== ScreenType.Create) {
    
      this.form.patchValue(this.data);
    }
  }

  onChange(event: any, name: string) {
   
  }
}
