import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { CourseModel, StudentModel } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/payments`);
  }

  override getState(): Observable<any> {
    this.state = {
      listStatus: [
        { name: 'Đã đóng ', value: true },
        { name: 'Nợ học phí', value: false },
      ],
    

    };
    return forkJoin({
      listCourse: this.getCourse().pipe(catchError(() => of([]))),
      listStudent: this.getStudent().pipe(catchError(() => of([]))),
    }).pipe(map((data: any) => (this.state = {
      ...this.state, ...data
    })));
  }
  getCourse() {
    return this.http.get<CourseModel[]>(`${environment.endpoint_url}/courses`);
  }
  getStudent() {
    return this.http.get<StudentModel[]>(`${environment.endpoint_url}/students`);
  }

}
