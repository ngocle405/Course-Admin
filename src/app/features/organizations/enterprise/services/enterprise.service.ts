import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeModel, EnterpriseModel } from '../models/enterprise.model';

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {
  constructor(private http: HttpClient) {}

  getData(): Observable<EnterpriseModel> {
    return this.http.get<EnterpriseModel>(`${environment.endpoint_url}/enterprise`);
  }

  update(data: EnterpriseModel): Observable<string> {
    return this.http.post<string>(`${environment.endpoint_url}/enterprise/update`, data);
  }

  getEmployees(): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${environment.endpoint_url}/employees`);
  }
}
