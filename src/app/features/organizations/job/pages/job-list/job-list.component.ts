import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { JobActionComponent } from '../../components';
import { JobModel, StateJob } from '../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent extends BaseTableComponent<JobModel> implements OnInit {
  constructor(injector: Injector, service: JobService) {
    super(injector, service);
  }

  override stateData!: StateJob;
  override params: JobModel = {
    code: '',
    organizationCode: '',
    unitCode: '',
    titleCode: '',
    name: '',
  };

  ngOnInit(): void {}

  override initConfigAction() {
    this.configAction = {
      title: 'Vị trí công việc',
      component: JobActionComponent,
    };
  }

  onReset() {
    this.params = {
      code: '',
      organizationCode: '',
      unitCode: '',
      titleCode: '',
      name: '',
    };
    this.search();
  }
}
