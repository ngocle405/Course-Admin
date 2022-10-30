import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { NotificationMessageService } from '@cores/services/message.service';
import { environment } from '@env';
import { catchError, delay, forkJoin, map, Observable, of } from 'rxjs';

import { CommonStateModel, NewModel, StateNew } from '../models/new.model';

@Injectable({
  providedIn: 'root',
})
export class NewService extends BaseService {
  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/news`);
  }
  override state!: StateNew | undefined;

  override getState(): Observable<StateNew> {
    if (this.state) {
      return of(this.state).pipe(delay(10));
    } else {
      this.state = {
        newCategories: [],
        listStatus: [
          { name: 'Tất cả', value: '' },
          { name: 'Hoạt động', value: true },
          { name: 'Dừng hoạt động', value: false },
        ],
      };
      return forkJoin({
        newCategories: this.getNewCategories().pipe(catchError(() => of<NewModel[]>([]))),
      }).pipe(
        map(
          (data: any) =>
            (this.state = {
              ...this.state,
              ...data,
            })
        )
      );
    }
  }
  getNewCategories() {
    return this.http.get<NewModel[]>(`${environment.endpoint_url}/newcategories`).pipe(map((data) => data));
  }
}
