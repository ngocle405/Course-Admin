import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { BaseActionComponent } from '@shared/components';
import { isEmpty } from 'lodash';
import * as _ from 'lodash';
import { ScreenType } from 'src/app/core/utils/enums';
import { OrganizationService } from '../../services/organization-structure.service';

@Component({
  templateUrl: './organization-structure-action.component.html',
  styleUrls: ['./organization-structure-action.component.scss'],
})
export class OrganizationActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: OrganizationService) {
    super(injector, service);
  }
  formListChildren = new FormArray([]);

  override form = this.fb!.group({
    id: [''],
    organizationCode: ['', Validators.required],
    organizationName: ['', Validators.required],
    determineNum: ['', Validators.required],
    signedPerson: [''],
    signedDate: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    note: [''],
    status: [''],
  });

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.startDate = isEmpty(this.data.startDate) ? null : new Date(this.data.startDate);
      this.data.endDate = isEmpty(this.data.endDate) ? null : new Date(this.data.endDate);
      this.data.signedDate = isEmpty(this.data.signedDate) ? null : new Date(this.data.signedDate);
      this.form.patchValue(this.data);
    }
    this.form.valueChanges.subscribe((data) => {});
  }
}
