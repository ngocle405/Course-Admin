import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseActionComponent } from '@shared/components';
import { ScreenType } from 'src/app/core/utils/enums';
import { CommonModel, StateListModel, WorkLocationModel } from '../../models/work-location.model';
import { WorkLocationService } from '../../services/work-location.service';

@Component({
  selector: 'app-work-location-action',
  templateUrl: './work-location-action.component.html',
  styleUrls: ['./work-location-action.component.scss'],
})
export class WorkLocationActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: WorkLocationService) {
    super(injector, service);
  }
  listGroupCode: any = [];
  wardList: CommonModel[] = [];
  districtList: CommonModel[] = [];
  provinceList: CommonModel[] = [];
  list = { provinceCode: '', districtCode: '' };
  override data: WorkLocationModel | undefined;
  override state!: StateListModel;
  override form = this.fb!.group({
    id: [''],
    code: ['', Validators.required],
    vnName: [''],
    enName: [''],
    groupCode: [''],
    status: true,
    startDate: [''],
    endDate: [''],
    note: [''],
    workLocation: [''],
    isHeadquarters: false,
    versionCode: [''],
    systemCode: [''],
    address: [''],
    countryCode: [''],
    provinceCode: [''],
    districtCode: [''],
    wardCode: [''],
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
  }
  onChange(event: any, name: string) {
  }
}
