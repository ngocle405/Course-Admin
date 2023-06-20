import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_LOADING } from '../utils/constants';
import { StreamDataService } from './stream-data.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private streamData: StreamDataService, private router: Router) {}
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean>  {
    const user = JSON.parse(sessionStorage.getItem('admin')!);

    return new Observable<boolean>((_observable) => {
      if (user === null) {
        this.router.navigateByUrl('/login');
      }
      setTimeout(() => {
        this.streamData.passData(APP_LOADING, true);
        return _observable.next(true);
      }, 1000);
    });
  }
}
export class CheckLoadPageService implements CanActivate {
  constructor(private streamData: StreamDataService, private router: Router) {}
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean>  {
    return new Observable<boolean>((_observable) => {
      setTimeout(() => {
        this.streamData.passData(APP_LOADING, true);
        return _observable.next(true);
      }, 1000);
    });
  }
}
