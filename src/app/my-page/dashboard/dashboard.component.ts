import { Component, OnInit, Injector } from '@angular/core';
import { HomeService } from '../services/home.service';
import * as _ from 'lodash';
import { BaseComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(inject: Injector, private service: HomeService) {
    super(inject);
  }
  news: any = [];
  model = {
    searchName: '',
    courseCategoryId: '',
    pageSize:999,
    pageIndex:1
  };
  listCourseCategory: any = [];
  listCourse: any = [];
  getNewRecord() {
    this.loadingService?.start();
    this.service.getNew().subscribe({
      next: (value) => {
        this.news = _.take(value, 3);
        this.loadingService?.complete();
      },
      error: (err) => {
        console.log(err);
        this.loadingService?.complete();
      },
    });
  }
  getCourseCategory() {
    this.service.getCourseCategory().subscribe({
      next: (data) => {
        this.listCourseCategory = data;
      },
    });
  }
  ngOnInit(): void {
    this.getNewRecord();
    this.getCourseCategory();
  }
  search() {
    this.service.search(this.model).subscribe({
      next: (value) => {
        this.listCourse = value?.content;
      },
    });
  }
}
