import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseActionComponent } from '@shared/components';
import { ScreenType } from 'src/app/core/utils/enums';

import { CommonModel, DependentUnitModel, StateDependentUnit } from '../../models/dependent.model';
import { DependentService } from '../../service/dependent.service';
import { ListDropdownService } from '../../service/list-dropdown.service';

@Component({
  templateUrl: './dependent-action.component.html',
  styleUrls: ['./dependent-action.component.scss'],
  host: {
    class: 'grade-dialog',
  },
})
export class DependentActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: DependentService, private serviceList: ListDropdownService) {
    super(injector, service);
  }
  listArea: CommonModel[] = [];
  listGroupCode: any = [];
  wardList: CommonModel[] = [];
  districtList: CommonModel[] = [];
  provinceList: CommonModel[] = [];
  list = { provinceCode: '', districtCode: '' };
  override data: DependentUnitModel | undefined;
  override state!: StateDependentUnit;
  override form = this.fb!.group({
    id: [''],
    code: ['', Validators.required],
    name: ['', Validators.required],
    t24Code: ['', Validators.required],
    vietnameseName: ['', Validators.required],
    englishName: ['', Validators.required],
    organizationCode: ['', Validators.required],
    parentCode: ['', Validators.required],
    groupCode: ['', Validators.required],
    codeCenter: ['', Validators.required],
    inDomestric: ['true'],
    workLocation: ['', Validators.required],
    hasParentAddress: [''],
    address: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    systemCode: [''],
    versionCode: [''],
    countryCode: [''],
    provinceCode: [''],
    districtCode: [''],
    wardCode: [''],
    status: [''],
    note: ['', Validators.required],
    sortOrder: [''],
  });

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.provinceList = this.data.provinceList!;
      this.districtList = this.data.districtList!;
      this.wardList = this.data.wardList!;
      this.form.patchValue(this.data);
    }
    this.form.valueChanges.subscribe((data) => {});
  }

  onChange(event: any, name: string) {
    let code = event.value;
    console.log(code);
    if (name === 'countryCode') {
      this.serviceList.getProvinces(code).subscribe({
        next: (list) => {
          this.provinceList = list;
        },
      });
    } else if (name === 'provinceCode') {
      this.list.provinceCode = code;
      this.serviceList.getDistricts(code).subscribe({
        next: (list) => {
          this.districtList = list;
        },
        error: () => {},
      });
    } else if (name === 'districtCode') {
      this.list.districtCode = code;
      this.serviceList.getWards(code).subscribe({
        next: (list) => {
          this.wardList = list;
        },
        error: () => {},
      });
    }
  }
}
