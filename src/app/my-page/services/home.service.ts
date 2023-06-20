import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  homeUrl = `${environment.endpoint_url}/homes/`;

  constructor(private http: HttpClient) {
    
  }
  getCourse() {
    return this.http.get<any>(this.homeUrl + 'listCourse');
  }
  getTeacher() {
    return this.http.get<any>(this.homeUrl + 'teacher-list');
  }
  getNew() {
    return this.http.get<any>(this.homeUrl + 'new-list');
  }
  getByCourseId(id:string) {
    return this.http.get<any>(this.homeUrl + 'findByCourse/'+ id);
  }
  getByTeacherId(id:string) {
    return this.http.get<any>(this.homeUrl + 'finbyTeacher/'+id);
  }
  create(data: any){
    return this.http.post(`${this.homeUrl}/Register`, data);
  }
}
