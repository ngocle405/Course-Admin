import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonModel } from '../models/work-location.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  list: any = {};

  constructor(private http: HttpClient) {}
  getProvinces(code: string) {
    return this.http.get<CommonModel[]>(`${environment.endpoint_url}/common-category/provinces/${code}`);
  }

  getDistricts(code: string) {
    return this.http.get<CommonModel[]>(`${environment.endpoint_url}/common-category/districts/${code}`);
  }

  getWards(code: string) {
    return this.http.get<CommonModel[]>(`${environment.endpoint_url}/common-category/wards/${code}`);
  }

  getWarCode(code: string) {
    return this.http.post<any>(`${environment.endpoint_url}/wards`, { wardsCode: [code] });
  }
}
