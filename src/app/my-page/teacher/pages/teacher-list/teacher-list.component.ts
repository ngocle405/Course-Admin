import { Component, Injector, OnInit } from '@angular/core';
import { CommonCategoryService } from '@cores/services/common-category.service';
import { LoadingService } from '@cores/services/loading.service';
import { BaseComponent, BaseTableComponent } from '@shared/components';
import { cloneDeep } from 'lodash';
import { MenuItem } from 'primeng/api';
import { TeacherModel } from '../../models/teacher.model';
import { TeacherService } from 'src/app/features/employees/teacher/services/teacher.service';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent extends BaseComponent implements OnInit   {
  constructor(injector:Injector,private service:TeacherService) {
    super(injector)
   
  }

  ngOnInit(): void {
    this.loadingService.start();
    //this.getState();
    this.getAll();
  }
  teacherList: TeacherModel[] | undefined;
   getAll() {
    this.loadingService.start();
    this.service.getTeacher().subscribe({
      next: (data) => {
        this.teacherList = data;
        this.loadingService.complete();
      },
      error: (e) => {
        this.loadingService.complete();
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    });
  }
}
