import { Injectable,inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationMessageService } from './message.service';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: LoginService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const payload = this.authService.parseJwt(token); // decode JWT payload part.
      if (payload.exp * 1000 <= Date.now()) { // Check token exp phải > giờ hiện tại mới đúng,còn không logout
        // redirect user to login page or auto refresh user's token and then replace the expired one and continue the process.
        void this.authService.logout();
      }
      // Thêm token vào header của yêu cầu
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let data = {};
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            
            // redirect user to the logout page
          }
        }
        return throwError(() => error);
      })
    );
  }
}
