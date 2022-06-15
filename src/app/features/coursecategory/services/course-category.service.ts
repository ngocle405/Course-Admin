import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { delay, Observable, of } from 'rxjs';
import { CourseCategoryModel, StateCourseCategory } from '../models/course-category.model';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService extends BaseService {

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/CourseCategories`);
  }
  override state: StateCourseCategory | undefined;
  override getState(): Observable<StateCourseCategory> {
      this.state = {
        listStatus: [
          { name: 'Tất cả', value: '' },
          { name: 'Hoạt động', value: true },
          { name: 'Dừng hoạt động', value: false },
        ],
        
      }; 
    return of(this.state);
  }
}
