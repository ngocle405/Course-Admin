import { Component, Injector, OnInit } from '@angular/core';
import { BaseActionComponent } from '@shared/components';
import { CommonJobService } from '../../services/common-job.service';
import { JobDescriptionService } from '../../services/job-description.service';

@Component({
  selector: 'app-job-description-copy',
  templateUrl: './job-description-copy.component.html',
  styleUrls: ['./job-description-copy.component.scss'],
})
export class JobDescriptionCopyComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: JobDescriptionService, private commonJobService: CommonJobService) {
    super(injector, service);
  }

  override form = this.fb!.group({
    jobId: [+this.configDialog.data?.jobId],
    startDate: [''],
  });

  ngOnInit(): void {}

  override save() {}
}
