import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { OrganizationActionComponent } from '../../components/organization-structure-action/organization-structure-action.component';
import { OrganizationStructureModel } from '../../models/organization-structure.model';
import { OrganizationService } from '../../services/organization-structure.service';

@Component({
  templateUrl: './organization-structure-list.component.html',
  styleUrls: ['./organization-structure-list.component.scss'],
})
export class OrganizationStructureListComponent
  extends BaseTableComponent<OrganizationStructureModel>
  implements OnInit
{
  constructor(injector: Injector, service: OrganizationService) {
    super(injector, service);
  }

  ngOnInit(): void {}

  override initConfigAction() {
    this.configAction = {
      component: OrganizationActionComponent,
      title: 'Mô hình tổ chức',
      dialog: {
        width: '85%',
      },
    };
  }
}
