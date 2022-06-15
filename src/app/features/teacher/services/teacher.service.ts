import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { StateTeacher, TeacherModel } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService{

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/Teachers`);
  }
  override state: StateTeacher | undefined;
  override getState(): Observable<StateTeacher> {
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
