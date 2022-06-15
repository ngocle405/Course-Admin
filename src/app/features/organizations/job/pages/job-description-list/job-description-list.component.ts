import { Component, Injector, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { BaseTableComponent } from '@shared/components';
import { ScreenType } from 'src/app/core/utils/enums';
import { JobDescriptionActionComponent, JobDescriptionCopyComponent } from '../../components';
import { JobDescriptionModel, StateJobDescription } from '../../models/job-description.model';
import { JobDescriptionService } from '../../services/job-description.service';

@Component({
  selector: 'app-job-description-list',
  templateUrl: './job-description-list.component.html',
  styleUrls: ['./job-description-list.component.scss'],
})
export class JobDescriptionListComponent extends BaseTableComponent<JobDescriptionModel> implements OnInit {
  constructor(injector: Injector, service: JobDescriptionService) {
    super(injector, service);
  }

  override params: JobDescriptionModel = {
    jobId: '',
    unitCode: '',
    jobCode: '',
  };

  override stateData!: StateJobDescription;

  override initConfigAction(): void {
    this.configAction = {
      title: 'Mô tả vị trí công việc',
      component: JobDescriptionActionComponent,
    };
  }

  override getState() {
    this.service.getState().subscribe({
      next: (state) => {
        this.stateData = state;
      },
    });
  }

  ngOnInit(): void {
    this.route?.params.subscribe((params: Params) => {
      this.params.jobId = params['id'];
    });
    this.search();
    this.fileNameExcel = 'job-description.xlsx';
  }

  override viewCreate() {
    if (!this.configAction?.component) {
      return;
    }
    const dialog = this.dialogService?.open(this.configAction!.component, {
      header: `Thêm mới ${this.configAction.title.toLowerCase()}`,
      showHeader: false,
      width: this.configAction.dialog?.width || '85%',
      data: {
        screenType: ScreenType.Create,
        state: this.stateData,
        jobId: this.params.jobId,
      },
    });
    dialog?.onClose.subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
          this.search();
        }
      },
    });
  }

  viewCopy(code: string) {
    const dialog = this.dialogService?.open(JobDescriptionCopyComponent, {
      header: `Sao chép vị trí công việc`,
      showHeader: false,
      width: '35%',
      data: {
        jobId: this.params.jobId,
      },
    });
    dialog?.onClose.subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
          this.search();
        }
      },
    });
  }

  onReset() {
    this.params.unitCode = '';
    this.params.jobCode = '';
    this.search();
  }
}
