import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonStateModel } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class CommonJobService {
  constructor(private readonly http: HttpClient) {}

  getAbilitiesByCapacity(code: string) {
    return this.http.get<CommonStateModel>(`${environment.endpoint_url}/ability/${code}/abilities`);
  }

  getLevelByAbility(code: string) {
    return this.http.get<CommonStateModel>(`${environment.endpoint_url}/ability/${code}/levels`);
  }

  getDescription(data: any) {
    return this.http.post<any>(`${environment.endpoint_url}/ability/information`, data);
  }

  getTitles() {
    return this.http.get<CommonStateModel>(`${environment.endpoint_url}/titles`);
  }

  getDivisions() {
    return this.http.get<CommonStateModel>(`${environment.endpoint_url}/common-category/get-children/DIVI`);
  }
}
