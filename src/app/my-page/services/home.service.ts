import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cleanDataTable, mapDataTable } from '@cores/utils/common-functions';
import { environment } from '@env';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  homeUrl = `${environment.endpoint_url}/homes/`;

  constructor(private http: HttpClient) {}
  getCourse() {
    return this.http.get<any>(this.homeUrl + 'listCourse');
  }
  getTeacher() {
    return this.http.get<any>(this.homeUrl + 'teacher-list');
  }
  getNew() {
    return this.http.get<any>(this.homeUrl + 'new-list');
  }
  getCourseCategory() {
    return this.http.get<any>(this.homeUrl + 'listCourseCategory');
  }
  findByNew(id: string) {
    return this.http.get<any>(this.homeUrl + 'find-by-new' + id);
  }
  getByCourseId(id: string) {
    return this.http.get<any>(this.homeUrl + 'findByCourse/' + id);
  }
  getByTeacherId(id: string) {
    return this.http.get<any>(this.homeUrl + 'finbyTeacher/' + id);
  }
  create(data: any) {
    return this.http.post(`${this.homeUrl}Register`, data);
  }
  search(params?: any) {
    const newParam: any = cleanDataTable(params);

    return this.http
      .get<any>(`${this.homeUrl}search`, {
        params: { ...newParam },
      })
      .pipe(map((data) => mapDataTable(data, params)));
  }
}
