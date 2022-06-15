import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CommonCategoryService {
  constructor(private http: HttpClient, private session: SessionService) {}

  getCommonCategory(code: string): Observable<any> {
    const state = this.session.getSessionData(`STATE_CATEGORY_${code}`);
    if (state) {
      return of(state);
    }
    return this.http.get(`${environment.endpoint_url}/commonCategory/search/${code}`);
  }
}
