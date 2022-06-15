import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TitleService } from '../../services/title.service';
import { BaseActionComponent } from '@shared/components';
import { ScreenType } from 'src/app/core/utils/enums';
import { StateTitle } from '../../models/title.model';

@Component({
  selector: 'app-title-action',
  templateUrl: './title-action.component.html',
  styleUrls: ['./title-action.component.scss'],
})
export class TitleActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: TitleService) {
    super(injector, service);
  }

  override state!: StateTitle;

  override form = this.fb!.group({
    id: [''],
    code: ['', Validators.required],
    name: ['', Validators.required],
    englishName: ['', Validators.required],
    vietnameseName: ['', Validators.required],
    jobPositionCode: [''],
    gradeCode: ['', Validators.required],
    note: [''],
    sortOrder: [''],
    header: false,
    leader: false,
    status: true,
  });

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    } else if (this.screenType === ScreenType.Update) {
      this.form?.get('code')!.disable();
    }

    if (this.data && this.screenType !== ScreenType.Create) {
      this.form.patchValue(this.data);
    }
  }
}
