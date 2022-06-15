import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { BranchActionComponent } from '../../components';
import { BranchModel, StateListModel } from '../../models';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
})
export class BranchListComponent extends BaseTableComponent<BranchModel> implements OnInit {
  constructor(injector: Injector, service: BranchService) {
    super(injector, service);
  }
  override stateData!: StateListModel;
  override params: BranchModel = {
    code: '',
    name: '',
    status: '',
    groupCode: '',
    organizationCode: '',
    workLocation: '',
  };

  ngOnInit(): void {
    if (!this.stateData) {
      this.stateData = {
       
     
       
       
     
  
        listOrganization: [],
        listWorkLocation: [],
     
      };
    }
  }

  override mapState(): void {

  }

  override initConfigAction() {
    this.configAction = {
      component: BranchActionComponent,
      title: 'Đơn vị quản lý',
      dialog: {
        width: '85%',
      },
    };
  }

  override mapDataSearch() {
    console.log(this.params);
    return { page: this.dataTable.currentPage, size: this.dataTable.size, ...this.params };
  }
}
