import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { ConfigsystemActionComponent } from '../../components';
import { ConfigSystemModel } from '../../models/config-system.model';
import { ConfigSystemService } from '../../service/config-system.service';

@Component({
  selector: 'app-config-system-list',
  templateUrl: './config-system-list.component.html',
  styleUrls: ['./config-system-list.component.scss'],
})
export class ConfigSystemListComponent extends BaseTableComponent<ConfigSystemModel> implements OnInit {
  constructor(inject: Injector, service: ConfigSystemService) {
    super(inject, service);
  }
  override params: ConfigSystemModel = {
    status: '',
    searchAddress: '',
  };
  ngOnInit(): void {}
  onReset() {}
  override initConfigAction(): void {
    this.configAction = {
      title: 'Quản trị hệ thống',
      component: ConfigsystemActionComponent,
    };
  }
}
