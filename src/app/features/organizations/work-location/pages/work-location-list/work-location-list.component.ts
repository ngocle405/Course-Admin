import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { WorkLocationActionComponent } from '../../components';
import { StateListModel, WorkLocationModel } from '../../models/work-location.model';
import { WorkLocationService } from '../../services/work-location.service';

@Component({
  selector: 'app-work-location-list',
  templateUrl: './work-location-list.component.html',
  styleUrls: ['./work-location-list.component.scss'],
})
export class WorkLocationListComponent extends BaseTableComponent<WorkLocationModel> implements OnInit {
  constructor(injector: Injector, service: WorkLocationService) {
    super(injector, service);
  }
  override stateData: StateListModel | undefined;
  listStatus: any = [];
  ngOnInit(): void {
    this.listStatus = [
      { name: 'Tất cả', value: '' },
      { name: 'Hoạt động', value: true },
      { name: 'Dừng hoạt động', value: false },
    ];
  }
  override params: WorkLocationModel = {
    code: '',
    status: '',
  };
  override initConfigAction() {
    this.configAction = {
      component: WorkLocationActionComponent,
      title: 'Đơn vị quản lý',
      dialog: {
        width: '85%',
      },
    };
  }
  override mapDataSearch() {
    return { page: this.dataTable.currentPage, size: this.dataTable.size, ...this.params };
  }
}
