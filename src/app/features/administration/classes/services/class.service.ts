import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { TeacherModel } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService extends BaseService{

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/classes`);
  }
  override getState(): Observable<any> {
    this.state = {
      listStatus: [
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
    };
    return forkJoin({

      listTeacher: this.getTeacher()
        .pipe(catchError(() => of([]))),
    }).pipe(map((data: any) => (this.state = {
      ...this.state, ...data
    })));
  }
  getTeacher() {
    return this.http.get<TeacherModel[]>(`${environment.endpoint_url}/Teachers`);
  }
  getSwitchMap( name: string) {
    return this.http.get(this.baseURL + `/Paging?pageIndex=1&pageSize=100&className=&teacherId=&status=&searchName=${name}`);
  }
}
