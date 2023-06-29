import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent, BaseTableComponent } from '@shared/components';
import { TeacherModel } from '../../models/teacher.model';
import { HomeService } from 'src/app/my-page/services/home.service';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent extends BaseComponent implements OnInit   {
  constructor(injector:Injector,private service:HomeService) {
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
