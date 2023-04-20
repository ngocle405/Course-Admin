import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class LoginService  extends BaseService {
  private adminLogin = new BehaviorSubject({});
  public admin$ = this.adminLogin.asObservable();
  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/admins`);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      map((admin) => {
        //debugger;
        sessionStorage.setItem('admin', JSON.stringify(admin));
        return admin;
      })
    );
  }
  logout() {
    sessionStorage.removeItem('admin');
    this.adminLogin.next(null!);
  }
  
}