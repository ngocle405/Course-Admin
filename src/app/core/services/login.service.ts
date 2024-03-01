import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { getFromLocalStorage, removeLocalStorage,  setLocalStorage } from '@cores/utils/common-functions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService  extends BaseService {
  private adminLogin = new BehaviorSubject({});
  public admin$ = this.adminLogin.asObservable();
  constructor(http:HttpClient,private router:Router) {
    super(http,`${environment.endpoint_url}/admins`);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      map((res) => {
        //debugger;
        setLocalStorage('user',res.data.user);
        setLocalStorage('access_token',res.data?.accessToken)
        return res;
      })
    );
  }
  logout() {
    removeLocalStorage('user');
    removeLocalStorage('access_token');
    this.router.navigateByUrl('/auth/login');
    this.adminLogin.next(null!);
  }
  getToken(): string | null {
    // Thực hiện logic để lấy token từ nơi lưu trữ, ví dụ: localStorage
    return getFromLocalStorage('access_token');
  }
  //hủy yêu cầu http khi token hết hạn
  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}