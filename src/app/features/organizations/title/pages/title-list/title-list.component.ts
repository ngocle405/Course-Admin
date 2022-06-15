import { BaseTableComponent } from '@shared/components';
import { Component, Injector, OnInit } from '@angular/core';
import { TitleActionComponent } from '../../components';
import { TitleService } from '../../services/title.service';
import { StateTitle, TitleModel } from '../../models/title.model';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss'],
})
export class TitleListComponent extends BaseTableComponent<TitleModel> implements OnInit {
  constructor(injector: Injector, service: TitleService) {
    super(injector, service);
  }

  override params: TitleModel = {
    nameSearch: '',
    gradeCode: null,
    jobPositionCode: null,
    status: null,
  };
  override stateData: StateTitle | undefined;

  override initConfigAction(): void {
    this.configAction = {
      title: 'Chức danh',
      component: TitleActionComponent,
    };
  }

  ngOnInit(): void {
    this.fileNameExcel = 'chuc-danh.xlsx';
  }

  onReset() {
    this.params = {
      nameSearch: '',
      gradeCode: null,
      jobPositionCode: null,
      status: null,
    };
    this.search();
  }
}
