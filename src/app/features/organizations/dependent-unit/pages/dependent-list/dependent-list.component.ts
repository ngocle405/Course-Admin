import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { DependentActionComponent } from '../../components';
import { DependentUnitModel, StateDependentUnit } from '../../models/dependent.model';
import { DependentService } from '../../service/dependent.service';

@Component({
  templateUrl: './dependent-list.component.html',
  styleUrls: ['./dependent-list.component.scss'],
})
export class DependentListComponent extends BaseTableComponent<DependentUnitModel> implements OnInit {
  constructor(injector: Injector, service: DependentService) {
    super(injector, service);
  }
  override stateData: StateDependentUnit | undefined;
  override params: DependentUnitModel = {
    code: '',
    status: undefined,
    parentCode: '',
    groupCode: '',
    workLocation: '',
    vietnameseName: '',
  };

  listStatus: any = [];
  ngOnInit(): void {
    this.listStatus = [
      { name: 'Tất cả', value: '' },
      { name: 'Hoạt động', value: true },
      { name: 'Dừng hoạt động', value: false },
    ];
  }

  override initConfigAction() {
    this.configAction = {
      title: 'Đơn vị trực thuộc',
      component: DependentActionComponent,
    };
  }
}
