import { Component, Injector, OnInit } from '@angular/core';
import { ScreenType } from '@cores/utils/enums';
import { BaseComponent, BaseTableComponent } from '@shared/components';
import { MenuItem } from 'primeng/api';

import { TeacherModel } from '../../models/teacher.model';
import { TeacherService } from 'src/app/features/employees/teacher/services/teacher.service';
@Component({
  selector: 'app-teacher-description',
  templateUrl: './teacher-description.component.html',
  styleUrls: ['./teacher-description.component.scss'],
})
export class TeacherDescriptionComponent extends BaseComponent implements OnInit {
  id?: string | null;

  constructor(inject: Injector,private service:TeacherService) {
    super(inject);
  }

  model: TeacherModel = {};
  ngOnInit(): void {
    this.loadingService.start();
    this.id = this.route?.snapshot.paramMap.get('teacherId');
    this.viewDetail(this.id!);
  }
   viewDetail(id: string) {
    this.loadingService.start();
    this.service.findById(id).subscribe({
      next: (data: any) => {
        this.model = data;
        this.loadingService.complete();
      },
      error: (e) => {
        this.loadingService.complete();
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau')!;
      },
    });
  }
}
