import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseActionComponent } from '@shared/components';
import { ScreenType } from 'src/app/core/utils/enums';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-action',
  templateUrl: './job-action.component.html',
  styleUrls: ['./job-action.component.scss'],
})
export class JobActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: JobService) {
    super(injector, service);
  }

  override form = this.fb!.group({
    id: [''],
    code: ['', Validators.required],
    abbreviations: ['', Validators.required],
    englishName: [''],
    vietnameseName: ['', Validators.required],
    hasUnit: false,
    unitCode: [''],
    titleCode: [''],
    divisionCode: [''],
    note: [''],
    changeCategory: false,
  });

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.form.patchValue(this.data);
    }
  }
}
