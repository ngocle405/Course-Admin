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
  constructor(inject: Injector,public services: ConfigSystemService) {
    super(inject, services);
  }
  override params: ConfigSystemModel = {
    status: '',
    searchAddress: '',
  };
  selectedItem=[];
  ngOnInit(): void {}
  onReset() {}
  override initConfigAction(): void {
    this.configAction = {
      title: 'Quản trị hệ thống',
      component: ConfigsystemActionComponent,
    };
  }
  deleteRange() {
    console.log(this.selectedItem);
    
    this.services.deleteSelected(this.selectedItem ).subscribe({
      next: (value) => {
        this.messageService?.success('Success');
        this.search();
      },
    });
  }
}
