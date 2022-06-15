import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { CourseModel, StateCourse } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService{

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/courses`);
  }
  override state!: StateCourse |undefined;
  override getState(): Observable<StateCourse> {
    this.state = {
      listStatus: [
        { name: 'Tất cả', value: '' },
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
      listCourseCategory:[],
      listTeacher:[]
    };
    return forkJoin({
      listCourseCategory: this.
        getCourseCategories()
        .pipe(catchError(() => of<CourseModel[]>([]))),
        listTeacher: this.getTeacher()
        .pipe(catchError(() => of<CourseModel[]>([]))),
    }).pipe(map((data: any) => (this.state = {
      ...this.state, ...data
    })));
  }
  getCourseCategories() {
    return this.http.get<CourseModel[]>(`${environment.endpoint_url}/CourseCategories`);
  }
  getTeacher() {
    return this.http.get<CourseModel[]>(`${environment.endpoint_url}/Teachers`);
  }
}
