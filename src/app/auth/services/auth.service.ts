import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  extends BaseService {
  private adminLogin = new BehaviorSubject({});
  public admin$ = this.adminLogin.asObservable();
  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/admins`);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      map((admin) => {
        //debugger;
        localStorage.setItem('admin', JSON.stringify(admin));
        this.adminLogin.next(admin);
        return admin;
      })
    );
  }
  logout() {
    localStorage.removeItem('admin');
    this.adminLogin.next(null!);
  }
  
}
