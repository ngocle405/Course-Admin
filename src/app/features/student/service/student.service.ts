import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { StateStudent, StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService {

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/students`);
  }
  override state!: StateStudent |undefined;
  override getState(): Observable<StateStudent> {
    this.state = {
      listStatus: [
        { name: 'Tất cả', value: '' },
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
      listCourse:[],
    
    };
    return forkJoin({
     
        listCourse: this.getCourse()
        .pipe(catchError(() => of<StudentModel[]>([]))),
    }).pipe(map((data: any) => (this.state = {
      ...this.state, ...data
    })));
  }
  getCourse(){
    return this.http.get<StudentModel[]>(`${environment.endpoint_url}/Courses`);
  }
  
}
